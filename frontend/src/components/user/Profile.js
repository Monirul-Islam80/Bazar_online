import React, { useEffect } from 'react';
import './Profile.css'
import {  useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../layout/loader/Loader';
import MetaData from '../layout/MetaData';


const Profile = ({history}) => {
    const{user, loading, isAuthUser}= useSelector((state)=>state.user);

    useEffect(() => {
        if (isAuthUser === false) {
            history.push('/login')
        }
    }, [history, isAuthUser]);
    
  return (
      <>
      {loading? (<Loader/>) : (
          <>
          <MetaData title={`${user.name}'s Profile`}/>
          <div className="profileContainer">
              <div>
                  <h1>My Profile</h1>
              <img src={user && user.avatar.url==="no_avatar"?'/Profile.png' : user.avatar.url} alt={user.name} />
              <Link to='/me/update'>Edit Profile</Link>  
              </div>
              <div>
                  <div>
                      <h4>Name</h4>
                      <p>{user.name}</p>
                  </div>
                  <div>
                      <h4>Email</h4>
                      <p>{user.email}</p>
                  </div>
                  <div>
                      <h4>Joined At</h4>
                      <p>{String(user.createdAt).substr(0, 10)}</p>
                  </div>
                  <div>
                      <Link to='/orders'>My Orders</Link>
                      <Link to='/password/update'>Change Password</Link>
                  </div>
              </div>
          </div>
          </>
      )}
      </>
  );
};

export default Profile;
