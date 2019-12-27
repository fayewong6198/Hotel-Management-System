import React, { useEffect, Profiler } from "react";
import PropTypes from "prop-types";
import LeftTab from "../layout/LeftTab";
import { connect } from "react-redux";
import {} from "../../actions/types";
import { getUserPayments } from "../../actions/payments";
import Moment from "react-moment";

import Spinner from "../layout/Spinner";
const UserPayments = ({ payments, getUserPayments }) => {
  useEffect(() => {
    getUserPayments();
  }, []);

  return (
    <div>
      <section>
        <div className="inner">
          <LeftTab></LeftTab>
          {!payments ? (
            <Spinner></Spinner>
          ) : (
            <div class="right-tab">
              <table class="table">
                <thead>
                  <th>Room ID</th>
                  <th>Check in Date</th>
                  <th>Check out Date</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th></th>
                </thead>
                <tbody>
                  {payments &&
                    payments.map(payment => {
                      return (
                        <tr>
                          <td>{payment.room.roomId}</td>
                          <td class="text-danger">
                            <strong>
                              <Moment format="DD/MM/YYYY">
                                {payment.checkInDate}
                              </Moment>
                            </strong>
                          </td>
                          <td class="text-danger">
                            <strong>
                              <Moment format="DD/MM/YYYY">
                                {payment.checkOutDate}
                              </Moment>
                            </strong>
                          </td>
                          <td>{payment.total}</td>
                          <td class="text-success">
                            <strong>{payment.status}</strong>
                          </td>
                          <td>
                            <a
                              href="payment-detail.html"
                              class="btn btn-success"
                            >
                              Details
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

UserPayments.propTypes = {
  getUserPayments: PropTypes.func.isRequired,
  payments: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  payments: state.payments.payments
});

export default connect(mapStateToProps, { getUserPayments })(UserPayments);
