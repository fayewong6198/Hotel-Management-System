import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SearchForm from "../layout/SearchForm";
import room_img from "../rooms/room.jpg";
import avatar from "../../img/canhdiem.jpg";
import Spinner from "../layout/Spinner";
import axios from "axios";

import { connect } from "react-redux";
import { getRoomById } from "../../actions/room";

const Room = ({
  match,
  location,
  getRoomById,
  room,
  auth: { isAuthenticated, user }
}) => {
  const [reviewData, setReviewData] = useState({
    rating: null,
    comment: ""
  });

  const { rating, comment } = reviewData;

  useEffect(() => {
    getRoomById(match.params.id);
  }, []);

  const onChange = e => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    console.log(reviewData);
    try {
      const config = {
        headers: {
          "Content-Type": "Application/json"
        }
      };

      const body = JSON.stringify(reviewData);
      const res = await axios.post(
        `/api/rooms/${match.params.id}/comments`,
        body,
        config
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="search">
      <div>
        <h2 class="text-primary">Search</h2>
        <SearchForm location={location}></SearchForm>
      </div>

      <div class="room-info">
        {room.loading === true ? (
          <Spinner></Spinner>
        ) : (
          <Fragment>
            <h1 class="large text-primary">Room ID {room.roomData.roomId}</h1>
            <img src={`/uploads/${room.roomData.image}`} alt="" />
            <div class="description">
              <div>
                {room.roomData.description}
                <h3>Adults: {room.roomData.numberOfAdults}</h3>
                <h3>Children: {room.roomData.numberOfChildren}</h3>
              </div>

              <div class="rating">
                <h1>90.0$</h1>
                <small>123 people give rating</small>

                <a class="btn btn-success">Reversion</a>
              </div>
              <div class="comment">
                <form class="form" onSubmit={e => onSubmit(e)}>
                  <div class="form-group">
                    <textarea
                      name="comment"
                      id=""
                      rows="5"
                      placeholder="Give your comment"
                      value={comment}
                      onChange={e => onChange(e)}
                    ></textarea>
                  </div>
                  <input
                    type="submit"
                    value="comment"
                    class="btn btn-primary"
                  />
                </form>
                <div class="comment-item">
                  <div class="user">
                    <img src={avatar} alt="" />
                    <a href="">
                      <strong>Jing Tian</strong>
                    </a>
                  </div>
                  <div class="text">
                    <p>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Animi odio repellendus aspernatur sapiente nobis dolore
                      cum in accusantium reprehenderit, facere dolorum ab, velit
                      harum, esse porro suscipit exercitationem beatae sit?
                    </p>
                    <small>01/01/2020 at 12h25p </small>
                    <div class="like">
                      <button class="btn">
                        <i class="fas fa-thumbs-up text-primary"></i> 4
                      </button>
                      <button class="btn">
                        <i class="fas fa-thumbs-down text-danger"></i> 4
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </section>
  );
};

Room.propTypes = {
  room: PropTypes.object.isRequired,
  getRoomById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  room: state.room,
  auth: state.auth
});
export default connect(mapStateToProps, { getRoomById })(Room);
