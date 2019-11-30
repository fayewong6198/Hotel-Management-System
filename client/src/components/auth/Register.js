import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";

import axios from "axios";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert("Password do not match", "danger");
    } else {
      console.log(formData);
      const newUser = {
        firstName,
        lastName,
        email,
        password
      };

      register(newUser);
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/"></Redirect>;
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create your account
      </p>
      <form onSubmit={e => onSubmit(e)} className="form">
        <div className="form-group">
          <input
            value={firstName}
            name="firstName"
            type="text"
            placeholder="First Name"
            required
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            value={lastName}
            onChange={e => onChange(e)}
            name="lastName"
            type="text"
            placeholder="Last Name"
            required
          />
        </div>
        <div className="form-group">
          <input
            value={email}
            onChange={e => onChange(e)}
            name="email"
            type="email"
            placeholder="Email Address"
            required
          />
          <small className="form-text">
            This site uses Gravatar, so if you want a profile image, use
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            value={password}
            onChange={e => onChange(e)}
            name="password"
            type="password"
            placeholder="Password"
            required
            minLength="5"
          />
        </div>
        <div className="form-group">
          <input
            value={confirmPassword}
            onChange={e => onChange(e)}
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            required
            minLength="5"
          />
        </div>
        <input type="submit" value="Register" className="btn btn-primary" />
        <p className="my-1">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { setAlert, register })(Register);
