import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import { FiFacebook, FiPhoneCall } from "react-icons/fi";

const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.instagram.com/__monirul___/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/soumiks/image/upload/v1649699820/bazar_avatar/gaf0hteuajg3bnyjjqhn.png"
              alt="Founder"
            />
            <Typography>Abhishek Singh</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @meabhisingh. Only with the
              purpose to teach MERN Stack on the channel 6 Pack Programmer
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://web.facebook.com/soumik.ahmad.5/"
              target="blank"
            >
              <FiFacebook className="youtubeSvgIcon" />
            </a>

            <a href="callto:+8801580736344" target="blank">
              < FiPhoneCall className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
