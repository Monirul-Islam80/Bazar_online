import { Button } from "@material-ui/core";
import React from "react";
import "./Contact.css";


const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:monirulislam49007@gmail.com">
        <Button>Contact: monirulislam49007@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;
