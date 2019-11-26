import React from "react";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Booking</h1>
          <form action="search.html" className="form form-reversion">
            <div className="type">
              <label for="type">Type of Room</label>
              <select name="type" id="">
                <option value="room">Room</option>
                <option value="hall">Hall</option>
              </select>
            </div>
            <div className="check-in-date">
              <label for="checkin-date">Check in Date</label>
              <input type="date" name="checkin-date" id="" />
            </div>
            <div className="check-out-date">
              <label for="checkin-date">Check out Date</label>
              <input type="date" name="checkout-date" id="" />
            </div>
            <div className="adult">
              <label for="adult">Number of aldut</label>
              <select name="adult" id="">
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
              <label for="children">Number of children</label>
              <select name="children" id="">
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
              <label for="rooms">Number of rooms</label>
              <select name="rooms" id="">
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
            <p className="my-1">
              Don't have a account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Landing;
