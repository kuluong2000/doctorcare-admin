import { combineReducers } from "redux";
import { sidebarToggle } from "./reducer/toggleSidebar";
import { modal } from "./reducer/modal";
import { userReducer } from "./reducer/userReducer";
export default combineReducers({
  sidebarToggle: sidebarToggle,
  modal: modal,
  user: userReducer,
});
