import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import avatar from "../../img/canhdiem.jpg";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  getCurrentProfile,
  updateProfile,
  uploadAvatar
} from "../../actions/user";
import LeftTab from "../layout/LeftTab";

const EditProfile = ({
  uploadAvatar,
  user: { profile, loading },
  getCurrentProfile,
  updateProfile
}) => {
  const [image, setAvatar] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "none",
    address: ""
  });

  const { firstName, lastName, email, phoneNumber, gender, address } = formData;

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      firstName: (profile && profile.firstName) || "",
      lastName: (profile && profile.lastName) || "",
      email: (profile && profile.email) || "",
      phoneNumber: (profile && profile.phoneNumber) || "",
      gender: (profile && profile.gender) || "none",
      address: (profile && profile.address) || ""
    });
  }, [loading]);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    updateProfile({
      firstName,
      lastName,
      email,
      phoneNumber,
      gender,
      address
    });

    // Update Avatar
    if (image) {
      let imageData = new FormData();
      imageData.append("avatar", image);
      uploadAvatar(imageData);
    }

    window.scrollTo(0, 0);
  };

  return (
    <div className="inner">
      <LeftTab></LeftTab>
      <div className="right-tab">
        <h1 className="large text-primary">
          Hi {profile && profile.firstName}
        </h1>
        {(image && <img src={URL.createObjectURL(image)} alt="" />) ||
          (profile && profile.avatar && (
            <img
              src={`http://localhost:5000/uploads/${profile.avatar}`}
              alt=""
            />
          ))}
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <label for="firstName">
              <strong>First Name</strong>
            </label>
            <input
              name="firstName"
              type="text"
              placeholder="Enter your name"
              onChange={e => onChange(e)}
              value={firstName}
            />
          </div>
          <div className="form-group">
            <label for="lastName">
              <strong>Last Name</strong>
            </label>
            <input
              name="lastName"
              type="text"
              placeholder="Enter your name"
              onChange={e => onChange(e)}
              value={lastName}
            />
          </div>
          <div className="form-group">
            <label for="email">
              <strong>Email:</strong>
            </label>
            <input
              name="email"
              type="text"
              placeholder="Enter your email"
              onChange={e => onChange(e)}
              value={email}
            />
          </div>
          <div className="form-group">
            <label for="phoneNumber">
              <strong>Phone Number:</strong>
            </label>
            <input
              name="phoneNumber"
              type="text"
              placeholder="Enter your phone number"
              onChange={e => onChange(e)}
              value={phoneNumber}
            />
          </div>
          <div className="form-group">
            <label for="address">
              <strong>Address:</strong>
            </label>
            <input
              name="address"
              type="text"
              placeholder="Enter your address"
              onChange={e => onChange(e)}
              value={address}
            />
          </div>
          <div className="form-group">
            <label for="gender">
              <strong>Gender:</strong>
            </label>
            <select
              name="gender"
              id=""
              onChange={e => onChange(e)}
              value={gender}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="none">None</option>
            </select>
          </div>
          <div className="form-group">
            <label for="password">
              <strong>Password:</strong>
            </label>
            <input type="password" placeholder="Your password" />
          </div>
          <div className="form-group">
            <label for="image">
              <strong>Image:</strong>
            </label>
            <input
              type="file"
              namee="image"
              onChange={e => {
                setAvatar(e.target.files[0]);
                console.log(image);
              }}
            />
          </div>
          <input type="submit" value="Appyle" className="btn btn-success" />
        </form>
      </div>
    </div>
  );
};

EditProfile.propTypes = {
  uploadAvatar: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  updateProfile,
  uploadAvatar
})(withRouter(EditProfile));
