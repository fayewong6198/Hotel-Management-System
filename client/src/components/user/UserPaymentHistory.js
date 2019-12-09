import React from "react";
import PropTypes from "prop-types";
import LeftTab from "../layout/LeftTab";

const UserPaymentHistory = props => {
  return (
    <section>
      <div className="inner">
        <LeftTab></LeftTab>
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
              <tr>
                <td>L1 102</td>
                <td class="text-danger">
                  <strong>1/2/2019</strong>
                </td>
                <td class="text-danger">
                  <strong>20/2/2019</strong>
                </td>
                <td>200 USD</td>
                <td class="text-success">
                  <strong>Done</strong>
                </td>
                <td>
                  <a href="payment-detail.html" class="btn btn-success">
                    Details
                  </a>
                </td>
              </tr>
              <tr>
                <td>L1 102</td>
                <td class="text-danger">
                  <strong>1/2/2019</strong>
                </td>
                <td class="text-danger">
                  <strong>20/2/2019</strong>
                </td>
                <td>200 USD</td>
                <td class="text-success">
                  <strong>Done</strong>
                </td>
                <td>
                  <a href="payment-detail.html" class="btn btn-success">
                    Details
                  </a>
                </td>
              </tr>
              <tr>
                <td>L1 102</td>
                <td class="text-danger">
                  <strong>1/2/2019</strong>
                </td>
                <td class="text-danger">
                  <strong>20/2/2019</strong>
                </td>
                <td>200 USD</td>
                <td class="text-success">
                  <strong>Done</strong>
                </td>
                <td>
                  <a href="payment-detail.html" class="btn btn-success">
                    Details
                  </a>
                </td>
              </tr>
              <tr>
                <td>L1 102</td>
                <td class="text-danger">
                  <strong>1/2/2019</strong>
                </td>
                <td class="text-danger">
                  <strong>20/2/2019</strong>
                </td>
                <td>200 USD</td>
                <td class="text-success">
                  <strong>Done</strong>
                </td>
                <td>
                  <a href="payment-detail.html" class="btn btn-success">
                    Details
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

UserPaymentHistory.propTypes = {};

export default UserPaymentHistory;
