import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { setAlert } from "../../actions/alert";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    console.log(formData);
    const newUser = {
      email,
      password
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const body = JSON.stringify(newUser);

      const res = await axios.post("/api/auth", body, config);
      console.log(res.data);
      setAlert("Login success", "success");
    } catch (error) {
      console.error(error.response.data);
      setAlert("Login errors", "danger");
    }
  };

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
            minLength="6"
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

export default Login;
