import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import rooms from "./rooms";
import room from "./room";
import user from "./user";
import users from "./users";
import comments from "./comments";
export default combineReducers({
  alert,
  auth,
  rooms,
  room,
  user,
  users,
  comments
});
