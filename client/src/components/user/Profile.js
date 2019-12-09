import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import EditProfile from "./EditProfile";
import LeftTab from "../layout/LeftTab";

const Profile = props => {
  return (
    <div className="inner">
      <LeftTab></LeftTab>
    </div>
  );
};

Profile.propTypes = {};

export default Profile;
