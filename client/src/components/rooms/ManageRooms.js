import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LeftTab from "../layout/LeftTab";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { searchRooms, deleteRoomById } from "../../actions/rooms";
import { getRoomById } from "../../actions/room";
import Spinner from "../layout/Spinner";

const ManageRooms = ({
  rooms: { rooms, loading },
  searchRooms,
  getRoomById,
  deleteRoomById
}) => {
  useEffect(() => {
    searchRooms();
  }, []);

  return (
    <div className="inner">
      <LeftTab></LeftTab>
      <div class="right-tab">
        <div class="row space-between my-1">
          <Link to="/create-room" class="btn btn-primary pull-left">
            Create Room
          </Link>
        </div>

        {loading ? (
          <Spinner></Spinner>
        ) : (
          <table class="table">
            <thead>
              <th>Room Type</th>
              <th>Room ID</th>
              <th>Price</th>

              <th>Status</th>
              <th></th>
            </thead>
            <tbody>
              {rooms &&
                rooms.map(room => {
                  return (
                    <tr>
                      <td>{room.type}</td>
                      <td>{room.roomId}</td>
                      <td>{room.price} USD</td>
                      <td>
                        <strong class="text-success">{room.status}</strong>
                      </td>
                      <td class="row">
                        <Link
                          to={`/edit-room/${room._id}`}
                          class="btn btn-success"
                        >
                          Change
                        </Link>
                        <button
                          class="btn btn-danger"
                          onClick={() => deleteRoomById(room._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

ManageRooms.propTypes = {
  searchRooms: PropTypes.func.isRequired,
  getRoomById: PropTypes.func.isRequired,
  deleteRoomById: PropTypes.func.isRequired,
  rooms: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  rooms: state.rooms
});

export default connect(mapStateToProps, {
  searchRooms,
  getRoomById,
  deleteRoomById
})(ManageRooms);
