import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const StaffRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, user },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated && !loading ? (
        <Redirect to="/"></Redirect>
      ) : user && user.role !== "staff" && user.role !== "admin" ? (
        <Redirect to="/"></Redirect>
      ) : (
        <Component {...props}></Component>
      )
    }
  ></Route>
);

StaffRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(StaffRoute);
