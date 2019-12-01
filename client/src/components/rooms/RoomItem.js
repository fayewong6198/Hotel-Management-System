import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import image from "./room.jpg";

const RoomItem = ({ room }) => {
  return (
    <Fragment>
      <div class="room-card">
        <div>
          <img src={image} alt="" />
        </div>
        <div class="info">
          <h2 class="text-primary">Room ID: {room.roomId} </h2>
          <small>{room.description}</small>
        </div>
        <div class="rating">
          <h1>9.0</h1>
          <small>123 people give rating</small>
          <a href="room-info.html" class="btn btn-primary">
            More details
          </a>
          <a class="btn btn-success">Reversion</a>
        </div>
      </div>
    </Fragment>
  );
};

RoomItem.propTypes = {};

export default RoomItem;
