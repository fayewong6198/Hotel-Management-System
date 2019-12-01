import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { searchRooms } from "../../actions/room";
import RoomItem from "./RoomItem";
import SearchForm from "../layout/SearchForm";

const Rooms = ({ match, location, rooms, searchRooms, isAuthenticated }) => {
  const params = new URLSearchParams(location.search);
  useEffect(() => {
    searchRooms(params);
  }, []);

  return (
    <section className="search">
      <div>
        <h2 class="text-primary">Search</h2>
        <SearchForm location={location}></SearchForm>
      </div>
      <div className="room-list">
        {rooms.count && rooms.count > 0 && (
          <h1 class="large text-primary">{rooms.count} rooms found</h1>
        )}
        {rooms.count && rooms.count > 0 ? (
          rooms.rooms.map(room => (
            <RoomItem key={room._id} room={room}></RoomItem>
          ))
        ) : (
          <h1 class="large text-primary">No rooms found</h1>
        )}
      </div>
    </section>
  );
};

Rooms.propTypes = {
  rooms: PropTypes.object.isRequired,
  searchRooms: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  rooms: state.room
});
export default connect(mapStateToProps, { searchRooms })(Rooms);
