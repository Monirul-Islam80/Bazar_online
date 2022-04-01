import Face from '@mui/icons-material/Face';
import "./updateProfile.css"
import MailOutline from '@mui/icons-material/MailOutline';
import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, updateProfile } from '../../actions/userAction';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstant';
import MetaData from '../layout/MetaData';
import Loader from '../layout/loader/Loader';



const UpdateProfile = ({history}) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {user} = useSelector(state => state.user)
    const { error, isUpdated, loading} = useSelector((state)=>state.profile)
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [avatar, setavater] = useState("");
    const [avatarPreview, setavaterPreview] = useState('/Profile.png');

    const updateProfileSubmit = (e) => {
        e.preventDefault();
        const myform = new FormData();
        myform.set("name", name);
        myform.set("email", email);
        myform.set("avatar", avatar);
        dispatch(updateProfile(myform));
    }
    const updateProfileDataChange = (e)=>{
       
            const reader = new FileReader();
            reader.onload = ()=>{
                if (reader.readyState === 2) {
                    setavaterPreview(reader.result);
                    setavater(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
            console.log(e.target.files[0])

      
    }
useEffect(() => {
    if (user) {
        setname(user.name);
        setemail(user.email);
        if (user.avatar.url === "no_avatar") {
            setavaterPreview("/Profile.png")
        }else{
            setavaterPreview(user.avatar.url)
        }
    }
    if (error) {
        alert.error(error);
        dispatch(clearErrors());
    }
    if (isUpdated) {
        alert.success('Profile Updated');
        dispatch(loadUser())
        history.push('/account')
        dispatch({type:UPDATE_PROFILE_RESET})
    }
}, [dispatch, error, alert, history, isUpdated, user]);
  return <>
  {
      loading? <Loader/>: (
        <>
        
        <MetaData title={`Update Profile`}/>
         <div className="updateProfileContainer">
                  <div className="updateProfileBox">
                      <h2>Update Profile</h2>
                      <form
                          className='updateProfileForm'
                          encType='multipart/form-data'
                          onSubmit={updateProfileSubmit}
                      >
                          
                          <div className="updateProfileName">
                              <Face />
                              <input type="text"
                                  placeholder='Name'
                                  required
                                  name='name'
                                  value={name}
                                  onChange={e=>setname(e.target.value)}
                              />
                          </div>
                          <div className="updateProfileEmail">
                              <MailOutline />
                              <input type="email"
                                  placeholder='Email'
                                  required
                                  name='email'
                                  value={email}
                                  onChange={e=>setemail(e.target.value)}
                              />
                          </div>
                          
                          <div id="updateProfileImage">
                              <img src={avatarPreview} alt="avater" />
                                  <input type="file"
                                      name='avatar'
                                      accept='image/*'
                                      onChange={updateProfileDataChange}
                                  />
                          </div>
                          <input type="submit" value="save" className='updateProfileBtn' />
                      </form>
                  </div>
      
        </div>
        </>
      )
  }
  </>
};

export default UpdateProfile;
