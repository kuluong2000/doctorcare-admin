import { combineReducers } from "redux";
import { sidebarToggle } from "./reducer/toggleSidebar";
import { modal } from "./reducer/modal";
export default combineReducers({
  sidebarToggle: sidebarToggle,
  modal: modal,
});
