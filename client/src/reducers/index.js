import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import rooms from "./rooms";
import room from "./room";
import user from "./user";
import users from "./users";
export default combineReducers({ alert, auth, rooms, room, user, users });
