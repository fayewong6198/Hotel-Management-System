import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { searchRooms } from "../../actions/rooms";
import RoomItem from "./RoomItem";
import SearchForm from "../layout/SearchForm";
import { setDate } from "../../actions/setDate";

const Rooms = ({
  match,
  location,
  rooms,
  searchRooms,
  isAuthenticated,
  setDate
}) => {
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    searchRooms(params);
    setDate(params.get("checkInDate"), params.get("checkOutDate"));
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
  searchRooms: PropTypes.func.isRequired,
  setDate: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  rooms: state.rooms
});
export default connect(mapStateToProps, { searchRooms, setDate })(Rooms);
