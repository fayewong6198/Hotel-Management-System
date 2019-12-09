import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import LeftTab from "../layout/LeftTab";
import avatar from "../../img/canhdiem.jpg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUserById, updateUser, uploadAvatar } from "../../actions/users";
const EditUser = ({
  uploadAvatar,
  match,
  getUserById,
  updateUser,
  users: { userLoading, user }
}) => {
  const [avatar, setAvatar] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "none",
    address: "",
    role: ""
  });

  const {
    id,
    firstName,
    lastName,
    email,
    phoneNumber,
    gender,
    address,
    password,
    role
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    getUserById(match.params.id);

    setFormData({
      id: match.params.id,
      firstName: (user && user.firstName) || "",
      lastName: (user && user.lastName) || "",
      email: (user && user.email) || "",
      phoneNumber: (user && user.phoneNumber) || "",
      gender: (user && user.gender) || "",
      address: (user && user.address) || "",
      password: (user && user.password) || "",
      role: (user && user.role) || "user"
    });
  }, [!userLoading]);

  const onSubmit = async e => {
    e.preventDefault();

    updateUser(formData);

    // Update Avatar
    if (avatar) {
      let imageData = new FormData();
      imageData.append("avatar", avatar);
      uploadAvatar(match.params.id, imageData);
    }

    window.scrollTo(0, 0);
  };

  return (
    <div className="inner">
      <LeftTab></LeftTab>
      <div className="right-tab">
        <h1 className="large text-primary">
          Update User: {user && user.lastName}
        </h1>

        {(avatar && <img src={URL.createObjectURL(avatar)} alt="" />) ||
          (user && user.avatar && (
            <img src={`http://localhost:5000/uploads/${user.avatar}`} alt="" />
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
            <input
              type="password"
              name="password"
              placeholder="Your password"
            />
          </div>
          <div className="form-group">
            <label for="role">
              <strong>Role:</strong>
            </label>
            <select name="role" id="" onChange={e => onChange(e)} value={role}>
              <option value="user">User</option>
              <option value="staff">Staff</option>
            </select>
          </div>
          <div className="form-group">
            <label for="image">
              <strong>Image:</strong>
            </label>
            <input
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

EditUser.propTypes = {
  uploadAvatar: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  getUserById: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users
});
export default connect(mapStateToProps, {
  getUserById,
  updateUser,
  uploadAvatar
})(EditUser);
