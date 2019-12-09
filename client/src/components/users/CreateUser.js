import React, { useState } from "react";
import PropTypes from "prop-types";
import LeftTab from "../layout/LeftTab";
import avatar from "../../img/canhdiem.jpg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createUser } from "../../actions/users";

const CreateUser = ({ createUser }) => {
  const [avatar, setAvatar] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "none",
    address: "",
    password: ""
  });

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    gender,
    address,
    password
  } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    let imageData = new FormData();
    imageData.append("avatar", avatar);

    createUser(imageData, formData);

    window.scrollTo(0, 0);
  };

  return (
    <div className="inner">
      <LeftTab></LeftTab>
      <div className="right-tab">
        <h1 className="large text-primary">Create new user</h1>

        {avatar && <img src={URL.createObjectURL(avatar)} alt="" />}

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
            <input
              type="password"
              name="password"
              placeholder="Your password"
              onChange={e => onChange(e)}
              value={password}
            />
          </div>
          <div className="form-group">
            <label for="image">
              <strong>Image:</strong>
            </label>
            <input
              multiple
              type="file"
              name="avatar"
              onChange={e => {
                setAvatar(e.target.files[0]);
                console.log(avatar);
              }}
            />
          </div>
          <input type="submit" value="Appyle" className="btn btn-success" />
        </form>
      </div>
    </div>
  );
};

CreateUser.propTypes = {
  createUser: PropTypes.func.isRequired
};

export default connect(null, { createUser })(CreateUser);
