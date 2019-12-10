import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRoomById } from "../../actions/room";
import Spinner from "./Spinner";
import useStateWithCallback from "use-state-with-callback";
import axios from "axios";
import { setAlert } from "../../actions/alert";
const Payment = ({
  match,
  getRoomById,
  setAlert,
  room: { loading, roomData }
}) => {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  // a and b are javascript Date objects
  function dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc1 - utc2) / MS_PER_DAY);
  }

  const [formData, setFormData] = useStateWithCallback(
    {
      checkInDate: "",
      checkOutDate: ""
    },
    (checkInDate, checkOutDate) => {
      if (!loading) {
        const check_in_date = new Date(formData.checkInDate);
        const check_out_date = new Date(formData.checkOutDate);

        setTotal(
          dateDiffInDays(check_out_date, check_in_date) * roomData.price
        );
      }
    }
  );

  const { checkInDate, checkOutDate } = formData;

  const [total, setTotal] = useState(0);
  useEffect(() => {
    getRoomById(match.params.id);
  }, []);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // console.log(check_in_date);
    // console.log(dateDiffInDays(check_out_date, check_in_date));
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (total > 0) {
      const config = {
        headers: {
          "Content-type": "Application/json"
        }
      };

      const body = JSON.stringify({ checkInDate, checkOutDate, total });

      try {
        const res = await axios.post(
          `/api/rooms/${match.params.id}/payment`,
          body,
          config
        );

        console.log(res);
        if (res.status === 200) setAlert("Booking successfull", "success");
        else {
          setAlert("Booking failed", "danger");
        }
      } catch (error) {
        console.error(error);

        setAlert(error.message, "danger");
      }
    } else {
      setAlert("Invalid Date", "danger");
    }
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Booking Page</h1>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <Fragment>
          <h1>Room ID: {roomData.roomId}</h1>
          <h1 className="">Price {roomData.price}</h1>
          <h1>Adults: {roomData.numberOfAdults}</h1>
          <h1>Children: {roomData.numberOfChildren}</h1>
          <form onSubmit={e => onSubmit(e)} className="form ">
            <div className="form-group check-in-date">
              <label for="checkInDate">Check in Date</label>
              <input
                type="date"
                name="checkInDate"
                value={checkInDate}
                onChange={e => onChange(e)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="form-group check-out-date">
              <label for="checkInDate">Check out Date</label>
              <input
                type="date"
                name="checkOutDate"
                value={checkOutDate}
                onChange={e => onChange(e)}
                min={checkInDate}
              />
            </div>

            <p className="lead">{total}$</p>
            <input
              type="submit"
              value="Reversion"
              className="btn btn-primary"
            />
          </form>
        </Fragment>
      )}
    </Fragment>
  );
};

Payment.propTypes = {
  setAlert: PropTypes.func.isRequired,
  room: PropTypes.object.isRequired,
  getRoomById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  room: state.room
});
export default connect(mapStateToProps, { getRoomById, setAlert })(Payment);
