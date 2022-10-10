import * as actionType from "./actionType";
// toggle sibar
export const showSidebar = (data) => {
  return {
    type: actionType.SHOW_SIDEBAR,
    payload: data,
  };
};
export const hideSidebar = (data) => {
  return {
    type: actionType.HIDE_SIDEBAR,
    payload: data,
  };
};

//open/close modal
export const openModal = (data) => {
  return {
    type: actionType.OPEN_MODAL,
    payload: data,
  };
};
export const hideModal = (data) => {
  return {
    type: actionType.CLOSE_MODAL,
    payload: data,
  };
};
