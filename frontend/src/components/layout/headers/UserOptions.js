import React, { useState } from 'react';
import './Header.css';
import { Backdrop, SpeedDial, SpeedDialAction,  } from '@mui/material';
import Dashboard from '@mui/icons-material/Dashboard'
import { MdExitToApp, MdListAlt, MdPerson, MdShoppingCart } from 'react-icons/md';
import { useHistory, } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
const UserOptions = ({user}) => {
    const alert = useAlert();
    const [open, setopen] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const {cartItem}=useSelector(state=>state.cart)

    const Options  = [
        {icon: <MdListAlt/>, name:"Orders", func: orders},
        {icon: <MdPerson/>, name:"Profile", func: account},
        {icon: <MdShoppingCart style={{color: cartItem.length>0? '#0aceff':'unset'}}/>, name:`Cart(${cartItem.length})`, func: cart},
        {icon: <MdExitToApp/>, name:"LogOut", func: logoutUser}
    ];
    if (user.role === "admin") {
        Options.unshift({
        icon: <Dashboard/>, name:"Dashboard", func: dashboard
        })
    };

    function dashboard(){
        history.push("/admin/dashboard");
    }
    function orders(){
        history.push("/orders");
    }
    function account(){
        history.push("/account");
    } 
       function cart(){
        history.push("/cart");
    }
    function logoutUser(){
        dispatch(logout());
       alert.success("LogOut Successful");
     
    }

  return <>
  <Backdrop
  open={open}
  style={{zIndex:'10'}}

  />
  <SpeedDial
  className="speedDial"
  style={{zIndex:'11'}}
  ariaLabel='SpeedDial tooltip example'
  onClose={()=>setopen(false)}
  onOpen={()=>setopen(true)}
  open={open}
  icon={<img
      className='speedDialIcon'
      src={user.avatar.url==="no_avatar" ? '/Profile.png' : user.avatar.url}
      alt='Profile'
      />}
      direction='down'
  >
{
    Options.map((option)=>(
      <SpeedDialAction key={option.name}
       icon={option.icon}
        tooltipTitle={ option.name} 
        onClick={option.func}
        tooltipOpen={window.innerWidth<=600?true:false}
        />  
    ))
}

  </SpeedDial>
  
  </>;
};

export default UserOptions;
