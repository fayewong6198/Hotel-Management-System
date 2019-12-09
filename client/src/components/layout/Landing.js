import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchRooms } from "../../actions/rooms";

const Landing = ({ location, isAuthenticated, searchRooms }) => {
  const params = new URLSearchParams(location.search);
  const [formData, setFormData] = useState({
    type: params.get("type") || "room",
    checkInDate: params.get("checkInDate") || "2019-2-3",
    checkOutDate: params.get("checkOutDate") || "2019-2-3",
    numberOfAdults: params.get("numberOfAdults") || 1,
    numberOfChildren: params.get("numberOfChildren") || 1,
    numberOfRooms: params.get("numberOfRooms") || 1
  });

  const {
    type,
    checkInDate,
    checkOutDate,
    numberOfAdults,
    numberOfChildren,
    numberOfRooms
  } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const onSubmit = async e => {
  //   e.preventDefault();

  //   searchRooms(formData);
  // };
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Booking</h1>
          <form action="/search" className="form form-reversion">
            <div className="type">
              <label for="type">Type of Room</label>
              <select
                name="type"
                id=""
                onChange={e => onChange(e)}
                value={type}
              >
                <option value="room">Room</option>
                <option value="hall">Hall</option>
              </select>
            </div>
            <div className="check-in-date">
              <label for="checkInDate">Check in Date</label>
              <input
                type="date"
                name="checkInDate"
                id=""
                onChange={e => onChange(e)}
              />
            </div>
            <div className="check-out-date">
              <label for="checkOutDate">Check out Date</label>
              <input
                type="date"
                name="checkOutDate"
                id=""
                onChange={e => onChange(e)}
              />
            </div>
            <div className="adult">
              <label for="numberOfAdults">Number of aldut</label>
              <select
                name="numberOfAdults"
                id=""
                onChange={e => onChange(e)}
                value={numberOfAdults}
              >
                <option value="1">1 adult</option>
                <option value="2">2 adult</option>
                <option value="3">3 adult</option>
                <option value="4">4 adult</option>
                <option value="5">5 adult</option>
                <option value="6">6 adult</option>
                <option value="7">7 adult</option>
                <option value="8">8 adult</option>
              </select>
            </div>
            <div className="children">
              <label for="numberOfChildren">Number of children</label>
              <select
                name="numberOfChildren"
                id=""
                onChange={e => onChange(e)}
                value={numberOfChildren}
              >
                <option value="1">1 children</option>
                <option value="2">2 children</option>
                <option value="3">3 children</option>
                <option value="4">4 children</option>
                <option value="5">5 children</option>
                <option value="6">6 children</option>
                <option value="7">7 children</option>
                <option value="8">8 children</option>
              </select>
            </div>
            <div className="rooms">
              <label for="numberOfRooms">Number of rooms</label>
              <select
                name="numberOfRooms"
                id=""
                onChange={e => onChange(e)}
                value={numberOfRooms}
              >
                <option value="1">1 rooms</option>
                <option value="2">2 rooms</option>
                <option value="3">3 rooms</option>
                <option value="4">4 rooms</option>
                <option value="5">5 rooms</option>
                <option value="6">6 rooms</option>
                <option value="7">7 rooms</option>
                <option value="8">8 rooms</option>
              </select>
            </div>
            <input type="submit" value="Find" className="btn btn-primary" />
            {!isAuthenticated ? (
              <p className="my-1">
                Don't have a account? <Link to="/register">Register</Link>
              </p>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  searchRooms: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { searchRooms })(Landing);
