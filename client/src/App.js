import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";

// Rooms
import Rooms from "./components/rooms/Rooms";
import ManageRooms from "./components/rooms/ManageRooms";
import Room from "./components/room/Room";
import CreateRoom from "./components/room/CreateRoom";
import EditRoom from "./components/room/EditRoom";
import Payment from "./components/layout/Payment";

// Users
import ManageUsers from "./components/users/ManageUsers";
import CreateUser from "./components/users/CreateUser";
import EditUser from "./components/users/EditUser";

// Auth
import Profile from "./components/user/Profile";
import Info from "./components/user/EditProfile";

// Routing
import PrivateRoute from "./components/routting/PrivateRoute";
import StaffRoute from "./components/routting/StaffRoute";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import EditProfile from "./components/user/EditProfile";
import UserPaymentHistory from "./components/user/UserPaymentHistory";

if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}

const App = () => {
  useEffect(() => {
    console.log("Use effect");
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar></Navbar>
          <Route exact path="/" component={Landing}></Route>
          <section className="container">
            <Alert></Alert>
            <Switch>
              <Route exact path="/register" component={Register}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/search" component={Rooms}></Route>
              <Route exact path="/room/:id" component={Room}></Route>
              <PrivateRoute
                exact
                path="/profile"
                component={Profile}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/payment/:id"
                component={Payment}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/payments-history"
                component={UserPaymentHistory}
              ></PrivateRoute>
              <StaffRoute
                exact
                path="/manage-rooms"
                component={ManageRooms}
              ></StaffRoute>
              <StaffRoute
                exact
                path="/create-room"
                component={CreateRoom}
              ></StaffRoute>
              <StaffRoute
                exact
                path="/edit-room/:id"
                component={EditRoom}
              ></StaffRoute>
              <StaffRoute
                exact
                path="/manage-users"
                component={ManageUsers}
              ></StaffRoute>
              <StaffRoute
                exact
                path="/create-user"
                component={CreateUser}
              ></StaffRoute>
              <StaffRoute
                exact
                path="/edit-user/:id"
                component={EditUser}
              ></StaffRoute>
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
