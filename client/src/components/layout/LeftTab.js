import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const LeftTab = ({ user }) => {
  return (
    <div className="left-tab">
      {user && user.role === "user" ? (
        <Fragment>
          <Link to="/">Search Room</Link>
          <Link to="/payments-history">Your Payment</Link>
          <Link to="/edit-profile">Edit Profile</Link>
        </Fragment>
      ) : (
        <Fragment>
          <Link to="/manage-users">Manage Customer</Link>
          <Link to="/manage-rooms">Manage Room</Link>
          <Link to="/manage-bookings">Booking history</Link>
          <Link to="/">Search Room</Link>
          <Link to="/payments-history">Your Payment</Link>
          <Link to="/edit-profile">Edit Profile</Link>
        </Fragment>
      )}
    </div>
  );
};

LeftTab.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});
export default connect(mapStateToProps)(LeftTab);
