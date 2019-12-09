import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import LeftTab from "../layout/LeftTab";
import roomImg from "../../img/room.jpg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateRoom, getRoomById, updateRoomImage } from "../../actions/room";

const EDITROOM = ({
  updateRoomImage,  
  updateRoom,
  getRoomById,
  room: { loading, roomData },
  match
}) => {
  const [image, setRoomImage] = useState(null);

  const [formData, setFormData] = useState({
    id: "",
    type: "",
    roomId: "",
    price: "",
    numberOfAdults: 1,
    numberOfChildren: 1,
    description: ""
  });

  const {
    id,
    type,
    roomId,
    price,
    numberOfAdults,
    numberOfChildren,
    description
  } = formData;

  useEffect(() => {
    getRoomById(match.params.id);

    setFormData({
      id: match.params.id,
      type: (roomData && roomData.type) || "",
      roomId: (roomData && roomData.roomId) || "",
      price: (roomData && roomData.price) || "",
      numberOfAdults: (roomData && roomData.numberOfAdults) || "",
      numberOfChildren: (roomData && roomData.numberOfChildren) || "",
      description: (roomData && roomData.description) || ""
    });
  }, [!loading]);
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    updateRoom(formData);

    // Update Room Image
    if (image) {
      const imageData = new FormData();
      imageData.append("image", image);
      updateRoomImage(match.params.id, imageData);
    }

    window.scrollTo(0, 0);
  };

  return (
    <div className="inner">
      <LeftTab></LeftTab>
      <div className="right-tab">
        <div className="row space-between my-1">
          <h1 class="text-primary">Edit Room {roomData && roomData.roomId}</h1>
          <Link to="/manage-rooms" class="btn btn-danger">
            Back
          </Link>
        </div>

        {(image && <img src={URL.createObjectURL(image)} alt="" />) ||
          (roomData && roomData.image && (
            <img
              src={`http://localhost:5000/uploads/${roomData.image}`}
              alt=""
            />
          ))}
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <label for="type">
              <strong>Type:</strong>
            </label>
            <select name="type" onChange={e => onChange(e)} value={type}>
              <option value="room">Room</option>
              <option value="hall">Hall</option>
            </select>
          </div>
          <div className="form-group">
            <label for="id">
              <strong>Room ID</strong>
            </label>
            <input
              type="text"
              placeholder="Room ID"
              name="roomId"
              onChange={e => onChange(e)}
              value={roomId}
              required
            />
          </div>
          <div className="form-group">
            <label for="price">
              <strong>Price:</strong>
            </label>
            <input
              type="text"
              placeholder="Price"
              name="price"
              onChange={e => onChange(e)}
              value={price}
            />
          </div>
          <div className="form-group">
            <label for="adult">
              <strong>Adults:</strong>
            </label>
            <input
              type="number"
              placeholder=""
              max="8"
              name="numberOfAdults"
              onChange={e => onChange(e)}
              value={numberOfAdults}
            />
          </div>
          <div className="form-group">
            <label for="children">
              <strong>Children:</strong>
            </label>
            <input
              type="number"
              placeholder=""
              max="8"
              name="numberOfChildren"
              onChange={e => onChange(e)}
              value={numberOfChildren}
            />
          </div>
          <div className="form-group">
            <label for="description">
              <strong>Description:</strong>
            </label>
            <textarea
              type="number"
              placeholder=""
              rows="5"
              name="description"
              onChange={e => onChange(e)}
              value={description}
            />
          </div>
          <div className="form-group">
            <label for="image">
              <strong>Image:</strong>
            </label>
            <input
              name="image"
              type="file"
              onChange={e => {
                setRoomImage(e.target.files[0]);
                console.log(image);
              }}
            />
          </div>
          <input type="submit" value="Update" className="btn btn-success" />
        </form>
      </div>
    </div>
  );
};

EDITROOM.propTypes = {
  createRoom: PropTypes.func.isRequired,
  updateRoomImage: PropTypes.func.isRequired,
  room: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  room: state.room
});

export default connect(mapStateToProps, {
  updateRoom,
  getRoomById,
  updateRoomImage
})(EDITROOM);
