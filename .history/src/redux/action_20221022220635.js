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
export const openModal = (mode, data) => {
  return {
    type: actionType.OPEN_MODAL,
    payload: { mode, data },
  };
};
export const hideModal = (mode, data) => {
  return {
    type: actionType.CLOSE_MODAL,
    payload: { mode, data },
  };
};

//data user
export const dataUser = (data) => {
  return {
    type: actionType.DATA_USER,
    payload: data,
  };
};
