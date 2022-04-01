import "./resetPassword.css"
import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, resetPassword } from '../../actions/userAction';
import MetaData from '../layout/MetaData';
import Loader from '../layout/loader/Loader';
import LockOpen from "@mui/icons-material/LockOpen";
import { MdLock } from "react-icons/md";

const ResetPassword = ({history, match}) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, success, loading } = useSelector((state) => state.forgotPassword)
    const [password, setpassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const myform = new FormData();
        myform.set("password", password);
        myform.set("confirmPassword", confirmPassword);
        dispatch(resetPassword(match.params.token, myform));
    }

   
    
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success('Password Updated');
            history.push('/login')
        }
    }, [dispatch, error, alert, history, success]);
  return (
    <>
    {
        loading ? <Loader /> : (
            <>

                <MetaData title={`Change Password`} />
                <div className="resetPasswordContainer">
                    <div className="resetPasswordBox">
                        <h2>Update Password</h2>
                        <form
                            className='resetPasswordForm'
                            encType='multipart/form-data'
                            onSubmit={resetPasswordSubmit}
                        >

                            
                            <div >
                                <LockOpen />
                                <input type="password"
                                    placeholder='New Password'
                                    required
                                    value={password}
                                    onChange={(e) => setpassword(e.target.value)}
                                    autoComplete='false'
                                />
                            </div>
                            <div className="loginPassword">
                                <MdLock />
                                <input type="password"
                                    placeholder='Confirm Password'
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setconfirmPassword(e.target.value)}
                                    autoComplete='false'
                                />
                            </div>
                            <input type="submit" value="save" className='resetPasswordBtn' />
                        </form>
                    </div>

                </div>
            </>
        )
    }
</>
  )
}

export default ResetPassword