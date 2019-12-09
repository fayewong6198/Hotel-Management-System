import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LeftTab from "../layout/LeftTab";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUsers, deleteUserById } from "../../actions/users";
import Spinner from "../layout/Spinner";

const ManageUsers = ({
  getUsers,
  deleteUserById,
  users: { loading, users }
}) => {
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="inner">
      <LeftTab></LeftTab>{" "}
      <div className="right-tab">
        <div className="row space-between my-1">
          <Link to="/create-user" className="btn btn-primary pull-left">
            Create User
          </Link>
        </div>
        {loading ? (
          <Spinner></Spinner>
        ) : (
          <table className="table">
            <thead>
              <th>User Name</th>
              <th>Room ID</th>
              <th>Payment</th>

              <th>Status</th>
              <th></th>
            </thead>
            <tbody>
              {users &&
                users.map(user => {
                  return (
                    <tr>
                      <td>{`${user.lastName}`}</td>
                      <td>L1 102</td>
                      <td>200USD</td>
                      <td>
                        <strong className="text-success">
                          Check out in 3 days
                        </strong>
                      </td>
                      <td className="row">
                        <Link
                          to={`/edit-user/${user._id}`}
                          className="btn btn-success"
                        >
                          Change
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteUserById(user._id)}
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

ManageUsers.propTypes = {
  deleteUserById: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps, { getUsers, deleteUserById })(
  ManageUsers
);
