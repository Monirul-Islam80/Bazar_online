import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './loginSignup.css'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import FaceIcon from '@mui/icons-material/Face'
import {useDispatch, useSelector} from 'react-redux';
import {login, clearErrors, register} from '../../actions/userAction'
import {useAlert} from 'react-alert'
import Loader from '../layout/loader/Loader';
;

const LoginSignup = ({history,location}) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {error, loading, isAuthUser} = useSelector(state => state.user)
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setloginEmail] = useState("");
    const [loginPassword, setloginPassword] = useState("");
    const [user, setuser] = useState({
        name: '',
        email: '',
        password: ''
    });
    const { name, email, password } = user;
    const [avatar, setavater] = useState('no_avatar');
    const [avatarPreview, setavaterPreview] = useState('/Profile.png');
   
    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    }
    const registerSubmit = (e) => {
        e.preventDefault();
        const myform = new FormData();
        myform.set("name", name);
        myform.set("email", email);
        myform.set("password", password);
        myform.set("avatar", avatar);
      
        dispatch(register(myform));
        
    }
    const registerDataChange = (e)=>{
        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = ()=>{
                if (reader.readyState === 2) {
                    setavaterPreview(reader.result);
                    setavater(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }else{
            setuser({...user, [e.target.name]: e.target.value})
        }
    }
    const redirect = location.search? location.search.split('=')[1] : '/account'
useEffect(() => {
    if (error) {
        alert.error(error);
        dispatch(clearErrors());
    }
    if (isAuthUser) {
        history.push(redirect)
    }
}, [dispatch, error, alert, history, isAuthUser, redirect]);

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove('shiftToRight');

            registerTab.current.classList.remove('shiftToNeutralForm');
            loginTab.current.classList.remove('shiftToLeft');

        }
        if (tab === 'register') {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove('shiftToNeutral');
            loginTab.current.classList.add('shiftToLeft');
            registerTab.current.classList.add('shiftToNeutralForm')
        }
    }
    return <>
        {loading? <Loader/> : 
        <>
        
        <div className="loginSignupContainer">
            <div className="loginSignupBox">
                <div>
                    <div className="login_signup_toggle">
                        <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                        <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                    </div>
                    <button ref={switcherTab}></button>
                </div>
                <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                    <div className="loginEmail">
                        <MailOutlineIcon />
                        <input type="email"
                            placeholder='Email'
                            required
                            value={loginEmail}
                            onChange={(e) => setloginEmail(e.target.value)}
                        />
                    </div>
                    <div className="loginPassword">
                        <LockOpenIcon />
                        <input type="password"
                            placeholder='Password'
                            required
                            value={loginPassword}
                            onChange={(e) => setloginPassword(e.target.value)}
                            autoComplete='false'
                        />
                    </div>
                    <Link to="/password/forgot">Forget Password ?</Link>
                    <input type="submit" value="Login" className='loginBtn' />
                </form>
                <form
                    className='signupForm'
                    ref={registerTab}
                    encType='multipart/form-data'
                    onSubmit={registerSubmit}
                >
                    
                    <div className="signupName">
                        <FaceIcon />
                        <input type="text"
                            placeholder='Name'
                            required
                            name='name'
                            value={name}
                            onChange={registerDataChange}
                        />
                    </div>
                    <div className="signupEmail">
                        <MailOutlineIcon />
                        <input type="email"
                            placeholder='Email'
                            required
                            name='email'
                            value={email}
                            onChange={registerDataChange}
                        />
                    </div>
                    <div className="signupName">
                        <LockOpenIcon />
                        <input type="password"
                            placeholder='Password'
                            required
                            name='password'
                            value={password}
                            onChange={registerDataChange}
                            autoComplete='false'
                        />
                    </div>
                    <div id="registerImage">
                        <img src={avatarPreview} alt="avater" />
                            <input type="file"
                                name='avatar'
                                accept='image/*'
                                onChange={registerDataChange}
                            />
                    </div>
                    <input type="submit" value="Register" className='signupBtn' />
                </form>
            </div>
        </div>
        </>
        }
    </>;
};

export default LoginSignup;


