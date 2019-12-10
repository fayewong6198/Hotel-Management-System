import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SearchForm from "../layout/SearchForm";
import CommentItem from "./Comment/CommentItem";
import Spinner from "../layout/Spinner";

import { connect } from "react-redux";
import { getRoomById } from "../../actions/room";
import { getCommentsByRoomId, createNewComment } from "../../actions/comments";

const Room = ({
  match,
  location,
  getRoomById,
  getCommentsByRoomId,
  createNewComment,
  room,
  auth: { isAuthenticated },
  comments: { comments }
}) => {
  const [reviewData, setReviewData] = useState({
    rating: null,
    comment: ""
  });

  const { rating, comment } = reviewData;

  useEffect(() => {
    getRoomById(match.params.id);
  }, []);

  useEffect(() => {
    getCommentsByRoomId(match.params.id);
  }, []);

  const onChange = e => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    createNewComment(match.params.id, reviewData);
  };

  return (
    <section className="search">
      <div>
        <h2 className="text-primary">Search</h2>
        <SearchForm location={location}></SearchForm>
      </div>

      <div className="room-info">
        {room.loading === true ? (
          <Spinner></Spinner>
        ) : (
          <Fragment>
            <h1 className="large text-primary">
              Room ID {room.roomData.roomId}
            </h1>
            <img src={`/uploads/${room.roomData.image}`} alt="" />
            <div className="description">
              <div>
                {room.roomData.description}
                <h3>Adults: {room.roomData.numberOfAdults}</h3>
                <h3>Children: {room.roomData.numberOfChildren}</h3>
              </div>

              <div className="rating">
                <h1>90.0$</h1>
                <small>123 people give rating</small>
                <br></br>
                {!isAuthenticated ? (
                  <Link>Login to make reversion</Link>
                ) : (
                  <Link to={`/payment/${room._id}`} class="btn btn-success">
                    Reversion
                  </Link>
                )}
              </div>
              <div className="comment">
                {!isAuthenticated ? (
                  <Link to="/login">You have to login to give a comment</Link>
                ) : (
                  <form className="form" onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
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
                      className="btn btn-primary"
                    />
                  </form>
                )}

                {comments &&
                  comments.map(comment => (
                    <CommentItem comment={comment}></CommentItem>
                  ))}
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
  auth: PropTypes.object.isRequired,
  comments: PropTypes.object.isRequired,
  createNewComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  room: state.room,
  auth: state.auth,
  comments: state.comments
});

export default connect(mapStateToProps, {
  getRoomById,
  getCommentsByRoomId,
  createNewComment
})(Room);
