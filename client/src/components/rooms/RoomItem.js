import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

const RoomItem = ({ room, auth: { isAuthenticated } }) => {
  return (
    <Fragment>
      <div class="room-card">
        <div>
          <img src={`/uploads/${room.image}`} alt="" />
        </div>
        <div class="info">
          <h2 class="text-primary">Room ID: {room.roomId} </h2>
          <small>{room.description}</small>
        </div>
        <div class="rating">
          <h1>9.0</h1>
          <small>123 people give rating</small>
          <Link to={"room/" + room._id} class="btn btn-primary">
            More details
          </Link>
          {!isAuthenticated ? (
            <Link>Login to make reversion</Link>
          ) : (
            <Link to={`/payment/${room._id}`} class="btn btn-success">
              Reversion
            </Link>
          )}
        </div>
      </div>
    </Fragment>
  );
};

RoomItem.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, null)(RoomItem);
