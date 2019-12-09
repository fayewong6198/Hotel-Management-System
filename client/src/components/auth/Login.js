import React, { useState } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    login({ email, password });
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/profile"></Redirect>;
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

        <input type="submit" value="Login" className="btn btn-primary" />
        <p className="my-1">
          Haven't had an account ? <Link to="Register">Register</Link>
        </p>
      </form>
    </section>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
