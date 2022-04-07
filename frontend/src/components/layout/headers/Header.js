import React from 'react';
import { ReactNavbar } from 'overlay-navbar'
import './Header.css';
import logo from '../../../images/logo.png'
import { MdSearch } from 'react-icons/md';
import { CgChart, CgProfile } from 'react-icons/cg';
function Header() {
  
const options = {
  burgerColorHover: "#0aceff",
  logo,
  logoWidth: "20vmax",
  navColor1: "#7abbcc99",
  logoHoverSize: "10px",
  logoHoverColor: "#0aceff",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#0aceff",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  ProfileIconElement: <CgProfile/> ,
  profileIconColor: "rgba(35, 35, 35,0.8)",
  SearchIconElement: <MdSearch/>,
  searchIconColor: "rgba(35, 35, 35,0.8)",
  CartIconElement: <CgChart/>,
  cartIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#0aceff",
  searchIconColorHover: "#0aceff",
  cartIconColorHover: "#0aceff",
  cartIconMargin: "1vmax",

};

  return <><ReactNavbar  {...options} /></>;
}

export default Header;
