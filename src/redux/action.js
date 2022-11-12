import axios from 'axios';
import BASE_URL from './../utils/configURL';
import * as actionType from './actionType';
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

//doctor

export const getAllDoctorStart = () => {
  return {
    type: actionType.GET_ALL_DOCTOR_START,
  };
};
export const getAllDoctorSuccess = (data) => {
  return {
    type: actionType.GET_ALL_DOCTOR_SUCCESS,
    payload: data,
  };
};
export const getAllDoctorFail = () => {
  return {
    type: actionType.GET_ALL_DOCTOR_FAIL,
  };
};

export const getAllDoctor = () => {
  return (dispatch) => {
    dispatch(getAllDoctorStart());
    axios
      .get(`${BASE_URL}/admin/doctor`)
      .then((res) => {
        if (res.status === 200) {
          return dispatch(getAllDoctorSuccess(res.data.data));
        } else {
          return dispatch(getAllDoctorFail());
        }
      })
      .catch((err) => dispatch(getAllDoctorFail()));
  };
};
export const createDoctor = (data) => {
  return (dispatch) => {
    dispatch(getAllDoctorStart());
    axios
      .post(`${BASE_URL}/admin/doctor`, data)
      .then((res) => {
        if (res.status === 201) {
          console.log(res.data);
          return dispatch(getAllDoctor());
        } else {
          return dispatch(getAllDoctorFail());
        }
      })
      .catch((err) => dispatch(getAllDoctorFail()));
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
          return dispatch(getALLDepartment());
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

//Diseases

export const getALLDiseasesStart = () => {
  return {
    type: actionType.GET_ALL_DISEASES_FAIL,
  };
};
export const getAllDiseasesSuccess = (data) => {
  return {
    type: actionType.GET_ALL_DISEASES_SUCCESS,
    payload: data,
  };
};
export const getAllDiseasesFail = () => {
  return {
    type: actionType.GET_ALL_DISEASES_FAIL,
  };
};
export const getAllDiseases = () => {
  return (dispatch) => {
    dispatch(getALLDiseasesStart());
    axios
      .get(`${BASE_URL}/admin/diseases`)
      .then((res) => {
        if (res.status === 200) {
          return dispatch(getAllDiseasesSuccess(res.data.data));
        } else {
          return dispatch(getAllDiseasesFail());
        }
      })
      .catch((err) => dispatch(getAllDiseasesFail()));
  };
};
export const insertDiseases = (data) => {
  return (dispatch) => {
    dispatch(getALLDiseasesStart());
    axios
      .post(`${BASE_URL}/admin/diseases`, data)
      .then((res) => {
        if (res.status === 201) {
          return dispatch(getAllDiseases());
        } else {
          return dispatch(getAllDiseasesFail());
        }
      })
      .catch((err) => dispatch(getAllDiseasesFail()));
  };
};
export const updateDiseases = (id, data) => {
  return (dispatch) => {
    dispatch(getALLDiseasesStart());
    axios
      .patch(`${BASE_URL}/admin/diseases/${id}`, data)
      .then((res) => {
        if (res.status === 200) {
          return dispatch(getAllDiseases());
        } else {
          return dispatch(getAllDiseasesFail());
        }
      })
      .catch((err) => dispatch(getAllDiseasesFail()));
  };
};
export const deleteDisease = (id) => {
  return (dispatch) => {
    dispatch(getALLDiseasesStart());
    axios
      .delete(`${BASE_URL}/admin/diseases/${id}`)
      .then((res) => {
        if (res.status === 204) {
          dispatch(getAllDiseases());
        } else {
          dispatch(getAllDiseasesFail());
        }
      })
      .catch((err) => dispatch(getAllDiseasesFail()));
  };
};

//Position

export const getALLPositionStart = () => {
  return {
    type: actionType.GET_ALL_POSITION_FAIL,
  };
};
export const getAllPositionSuccess = (data) => {
  return {
    type: actionType.GET_ALL_POSITION_SUCCESS,
    payload: data,
  };
};
export const getAllPositionFail = () => {
  return {
    type: actionType.GET_ALL_POSITION_FAIL,
  };
};
export const getAllPosition = () => {
  return (dispatch) => {
    dispatch(getALLPositionStart());
    axios
      .get(`${BASE_URL}/admin/position`)
      .then((res) => {
        if (res.status === 200) {
          return dispatch(getAllPositionSuccess(res.data.data));
        } else {
          return dispatch(getAllPositionFail());
        }
      })
      .catch((err) => dispatch(getAllPositionFail()));
  };
};
export const insertPosition = (data) => {
  return (dispatch) => {
    dispatch(getALLPositionStart());
    axios
      .post(`${BASE_URL}/admin/position`, data)
      .then((res) => {
        if (res.status === 201) {
          return dispatch(getAllPosition());
        } else {
          return dispatch(getAllPositionFail());
        }
      })
      .catch((err) => dispatch(getAllPositionFail()));
  };
};
export const updatePosition = (id, data) => {
  return (dispatch) => {
    dispatch(getALLPositionStart());
    axios
      .patch(`${BASE_URL}/admin/position/${id}`, data)
      .then((res) => {
        if (res.status === 200) {
          return dispatch(getAllPosition());
        } else {
          return dispatch(getAllPositionFail());
        }
      })
      .catch((err) => dispatch(getAllPositionFail()));
  };
};
export const deletePosition = (id) => {
  return (dispatch) => {
    dispatch(getALLPositionStart());
    axios
      .delete(`${BASE_URL}/admin/position/${id}`)
      .then((res) => {
        if (res.status === 204) {
          dispatch(getAllPosition());
        } else {
          dispatch(getAllPositionFail());
        }
      })
      .catch((err) => dispatch(getAllPositionFail()));
  };
};
