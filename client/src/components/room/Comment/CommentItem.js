import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteComment } from "../../../actions/comments";

const CommentItem = ({
  deleteComment,
  auth,
  comment: { _id, comment, user, createdAt }
}) => {
  return (
    <Fragment>
      <div className="comment-item">
        <div className="user">
          <img src={`/uploads/${user.avatar}`} alt="" />
          <a href="">
            <strong>{user.lastName}</strong>
          </a>
        </div>
        <div className="text">
          <p>{comment}</p>
          <small>
            at{" "}
            <Moment format="DD/MM/YYYY HH:mm">
              {createdAt.toLocaleString()}
            </Moment>
          </small>
          <div className="like">
            <button className="btn">
              <i className="fas fa-thumbs-up text-primary"></i> 4
            </button>
            <button className="btn">
              <i className="fas fa-thumbs-down text-danger"></i> 4
            </button>
          </div>
        </div>
      </div>
      {auth &&
      auth.user &&
      user._id &&
      (auth.user.role === "admin" || auth.user._id === user._id) ? (
        <Fragment>
          {" "}
          <button className="btn btn-danger" onClick={() => deleteComment(_id)}>
            Delete
          </button>
          <button className="btn btn-success">Change</button>
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );
};

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { deleteComment })(CommentItem);
