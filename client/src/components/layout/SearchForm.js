import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchRooms } from "../../actions/rooms";
import { setDate } from "../../actions/setDate";

const SearchForm = ({ location, isAuthenticated, searchRooms, setDate }) => {
  const params = new URLSearchParams(location.search);
  const [formData, setFormData] = useState({
    type: params.get("type") || "room",
    checkInDate: params.get("checkInDate") || null,
    checkOutDate: params.get("checkOutDate") || null,
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

    if (checkInDate != null && checkOutDate != null)
      setDate(checkInDate, checkOutDate);
  };
  return (
    <form action="/search" className="form form-reversion">
      <div className="type">
        <label for="type">Type of Room</label>
        <select name="type" id="" onChange={e => onChange(e)} value={type}>
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
          value={checkInDate}
          required
          min={new Date().toISOString().split("T")[0]}
        />
      </div>
      <div className="check-out-date">
        <label for="checkOutDate">Check out Date</label>
        <input
          type="date"
          name="checkOutDate"
          id=""
          onChange={e => onChange(e)}
          value={checkOutDate}
          min={checkInDate}
          required
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
      {!isAuthenticated ? <p className="my-1"></p> : ""}
    </form>
  );
};

SearchForm.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  searchRooms: PropTypes.func.isRequired,
  setDate: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { searchRooms, setDate })(SearchForm);
