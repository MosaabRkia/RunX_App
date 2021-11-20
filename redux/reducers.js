import { combineReducers } from "redux";
import UserReducer from "./User/UserReducer";
import UserDataReducer from "./UpdateUserData/UpdateUserDataReducer";

export default combineReducers({
  UserReducer,
  UserDataReducer,
});
