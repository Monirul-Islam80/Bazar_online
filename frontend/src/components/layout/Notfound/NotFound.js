import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";
import { BiErrorCircle } from "react-icons/bi";
import { Typography } from "@material-ui/core";

const NotFound = () => {
  return (
    <div className="PageNotFound">
      <BiErrorCircle />

      <Typography >Page Not Found </Typography>
      <Link className="back" to="/">Home</Link>
    </div>
  );
};

export default NotFound;
