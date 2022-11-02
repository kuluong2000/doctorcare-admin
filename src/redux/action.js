import axios from "axios";
import BASE_URL from "./../utils/configURL";
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

export const hideModal = () => {
  return {
    type: actionType.CLOSE_MODAL,
  };
};

//data user
export const dataUser = (data) => {
  return {
    type: actionType.DATA_USER,
    payload: data,
  };
};

//department
export const getAllDepartmentStart = () => {
  return {
    type: actionType.GET_ALL_DEPARTMENT_START,
  };
};
export const getAllDepartmentSuccess = (data) => {
  return {
    type: actionType.GET_ALL_DEPARTMENT_SUCCESS,
    payload: data,
  };
};
export const getAllDepartmentFail = (data) => {
  return {
    type: actionType.GET_ALL_DEPARTMENT_FAIL,
    payload: data,
  };
};
export const getALLDepartment = () => {
  return (dispatch) => {
    dispatch(getAllDepartmentStart());
    axios
      .get(`${BASE_URL}/admin/department`)
      .then((res) => {
        if (res.status === 200 || res.data.data) {
          return dispatch(getAllDepartmentSuccess(res.data.data));
        }
        return dispatch(getAllDepartmentFail(res));
      })
      .catch((err) => {
        return dispatch(getAllDepartmentFail(err));
      });
  };
};

export const insertDepartment = (data) => {
  return (dispatch) => {
    dispatch(getAllDepartmentStart());
    axios
      .post(`${BASE_URL}/admin/department`, data)
      .then((res) => {
        if (res.status === 201) {
          console.log(res.data);
          return dispatch(getALLDepartment());
          // console.log(res.data.data);
        } else {
          return dispatch(getAllDepartmentFail(res));
        }
      })
      .catch((err) => dispatch(getAllDepartmentFail(err)));
  };
};
export const updateDepartment = (id, data) => {
  return (dispatch) => {
    dispatch(getAllDepartmentStart());
    axios
      .patch(`${BASE_URL}/admin/department/${id}`, data)
      .then((res) => {
        if (res.data || res.status === 200) {
          return dispatch(getALLDepartment());
        } else {
          return dispatch(getAllDepartmentFail(res));
        }
      })
      .catch((err) => dispatch(getAllDepartmentFail(err)));
  };
};
export const deleteDepartment = (id) => {
  return (dispatch) => {
    dispatch(getAllDepartmentStart());
    axios
      .delete(`${BASE_URL}/admin/department/${id}`)
      .then((res) => {
        console.log(res.status);
        if (res.status === 204) {
          return dispatch(getALLDepartment());
        } else {
          return dispatch(getAllDepartmentFail(res));
        }
      })
      .catch((err) => dispatch(getAllDepartmentFail(err)));
  };
};
