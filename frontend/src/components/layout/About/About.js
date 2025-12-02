import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import { FiFacebook, FiGithub, FiPhoneCall } from "react-icons/fi";

const About = () => {
  const visitInstagram = () => {
    window.location = "https://moniruls.netlify.app/";
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
            <Typography>Monirul Islma Soumik</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Portfolio
            </Button>
            <span>This is a ecommerce wesbite made by Monirul.</span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Socials</Typography>
            <a href="https://github.com/Monirul-Islam80" target="blank">
              <FiGithub className="youtubeSvgIcon" />
            </a>

            <a href="callto:+8801580736344" target="blank">
              <FiPhoneCall className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
