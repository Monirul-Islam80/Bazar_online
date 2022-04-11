import React, { useEffect, useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { BsPersonSquare } from "react-icons/bs";

import { MdShoppingCart, MdClose, MdDehaze } from "react-icons/md";
import { FcSearch } from "react-icons/fc";

const Header = () => {
  const logo = 'https://res.cloudinary.com/soumiks/image/upload/v1649440875/bazar_avatar/vyokiycg8nu51hswft4x.png'
       const [state, setstate] = useState('');
       const [btn, setbtn] = useState(false)
       const [animation, setanimation] = useState('');
       const toggle = ()=>{
if (animation === '') {
  setstate("flex")
  setanimation("anima1")
}else if (animation === "anima1") {
  setanimation( "anima2" )
}else if(animation === "anima2"){
  setanimation("anima1")
}
       }
useEffect(() => {
  setstate("none")
}, [])

  return (
    <>
    <div className='togglebtn'>
      <span onClick={()=>{toggle(); setbtn(!btn)} }>{ btn===false? <MdDehaze/> : <MdClose/>}</span>
    </div>
      <div className={`nav ${animation} `} style={{display: state }}>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="link1">
          <div>
            <Link to='/'>Home</Link>
            <Link to='/products'>Products</Link>
          </div>
          <div>
            <Link to='/contact'>Contact</Link>
            <Link to='/about'>About</Link>
          </div>


        </div>
        <div className="link2">
          <Link to="/search" >{<FcSearch />}</Link>
          <Link to="/cart">{< MdShoppingCart />}</Link>
          <Link to="/account">{<BsPersonSquare />}</Link>
        </div>
      </div>
    </>
  )
}

export default Header
