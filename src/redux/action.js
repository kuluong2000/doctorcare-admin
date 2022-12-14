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

//Account
export const getAllAccountStart = () => {
  return {
    type: actionType.GET_ALL_ACCOUNT_START,
  };
};
export const getAllAccountSuccess = (data) => {
  return {
    type: actionType.GET_ALL_ACCOUNT_SUCCESS,
    payload: data,
  };
};
export const getAllAccountFail = () => {
  return {
    type: actionType.GET_ALL_ACCOUNT_FAIL,
  };
};

export const getAllAccount = () => {
  return (dispatch) => {
    dispatch(getAllAccountStart);
    axios
      .get(`${BASE_URL}/admin/account`)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem('Account', JSON.stringify(res.data.data));
          return dispatch(getAllAccountSuccess(res.data.data));
        } else {
          return dispatch(getAllAccountFail());
        }
      })
      .catch((err) => dispatch(getAllAccountFail()));
  };
};
export const updateAccount = (id, data) => {
  return (dispatch) => {
    dispatch(getAllAccountStart());
    axios
      .patch(`${BASE_URL}/admin/account/${id}`, data)
      .then((res) => {
        if (res.status === 200) {
          return dispatch(getAllAccount());
        } else {
          return dispatch(getAllAccountFail());
        }
      })
      .catch((err) => dispatch(getAllAccountFail()));
  };
};
export const lockOrUnlockAccountPatient = (id, data) => {
  return (dispatch) => {
    dispatch(getAllAccountStart());
    axios
      .patch(`${BASE_URL}/admin/account/lockOrUnlock/${id}`, data)
      .then((res) => {
        if (res.status === 200) {
          return dispatch(getAllAccount());
        } else {
          return dispatch(getAllAccountFail());
        }
      })
      .catch((err) => dispatch(getAllAccountFail()));
  };
};

//booking
export const getAllBookingStart = () => {
  return {
    type: actionType.GET_ALL_BOOKING_START,
  };
};
export const getAllBookingSuccess = (data) => {
  return {
    type: actionType.GET_ALL_BOOKING_SUCCESS,
    payload: data,
  };
};
export const getAllBookingFail = () => {
  return {
    type: actionType.GET_ALL_BOOKING_FAIL,
  };
};

export const getAllBookingByDoctor = (id, date) => {
  return (dispatch) => {
    dispatch(getAllBookingStart());
    axios
      .get(`${BASE_URL}/admin/booking/${id}?date=${date}`)
      .then((res) => {
        if (res.status === 200) {
          return dispatch(getAllBookingSuccess(res.data.data));
        } else {
          return dispatch(getAllBookingFail());
        }
      })
      .catch((err) => dispatch(getAllBookingFail()));
  };
};
export const verifyBookingByDoctor = (idBooking, data, idDoctor) => {
  return (dispatch) => {
    dispatch(getAllBookingStart());
    axios
      .patch(`${BASE_URL}/admin/booking/${idBooking}`, data)
      .then((res) => {
        if (res.status === 200) {
          console.log(data);
          return dispatch(getAllBookingByDoctor(idDoctor, data.date));
        } else {
          return dispatch(getAllBookingFail());
        }
      })
      .catch((err) => dispatch(getAllBookingFail()));
  };
};

export const getAllBooking = () => {
  return (dispatch) => {
    dispatch(getAllBookingStart());
    axios
      .get(`${BASE_URL}/admin/booking`)
      .then((res) => {
        if (res.status === 200) {
          return dispatch(getAllBookingSuccess(res.data.data));
        } else {
          return dispatch(getAllBookingFail());
        }
      })
      .catch((err) => dispatch(getAllBookingFail()));
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
export const updateDoctor = (id, data) => {
  return (dispatch) => {
    dispatch(getAllDoctorStart());
    axios
      .patch(`${BASE_URL}/admin/doctor/${id}`, data)
      .then((res) => {
        if (res.status === 200) {
          return dispatch(getAllDoctor());
        } else {
          return dispatch(getAllDoctorFail());
        }
      })
      .catch((err) => dispatch(getAllDoctorFail()));
  };
};

export const lockOrUnlockAccountDoctor = (id, data) => {
  return (dispatch) => {
    dispatch(getAllDoctorStart());
    axios
      .patch(`${BASE_URL}/admin/doctor/locked/${id}`, data)
      .then((res) => {
        if (res.status === 200) {
          return dispatch(getAllDoctor());
        } else {
          return dispatch(getAllDoctorFail());
        }
      })
      .catch((err) => dispatch(getAllDoctorFail()));
  };
};
export const lockScheduleOfDoctor = (id, data) => {
  return (dispatch) => {
    dispatch(getAllDoctorStart());
    axios
      .patch(`${BASE_URL}/admin/doctor/lockScheduleOfDoctor/${id}`, data)
      .then((res) => {
        if (res.status === 200) {
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

//Medicine

export const getAllMedicineStart = () => {
  return {
    type: actionType.GET_ALL_MEDICINE_START,
  };
};
export const getAllMedicineSuccess = (data) => {
  return {
    type: actionType.GET_ALL_MEDICINE_SUCCESS,
    payload: data,
  };
};
export const getAllMedicineFail = () => {
  return { type: actionType.GET_ALL_MEDICINE_FAIL };
};

export const getAllMedicine = () => {
  return (dispatch) => {
    dispatch(getAllMedicineStart());
    axios
      .get(`${BASE_URL}/admin/medicine`)
      .then((res) => {
        if (res.status === 200) {
          return dispatch(getAllMedicineSuccess(res.data.data));
        } else {
          return dispatch(getAllMedicineFail());
        }
      })
      .catch((err) => dispatch(getAllMedicineFail()));
  };
};
export const createMedicine = (data) => {
  return (dispatch) => {
    dispatch(getAllMedicineStart());
    axios
      .post(`${BASE_URL}/admin/medicine`, data)
      .then((res) => {
        if (res.status === 201) {
          return dispatch(getAllMedicine());
        } else {
          return dispatch(getAllMedicineFail());
        }
      })
      .catch((err) => dispatch(getAllMedicineFail()));
  };
};
export const updateMedicine = (id, data) => {
  return (dispatch) => {
    dispatch(getAllMedicineStart());
    axios
      .patch(`${BASE_URL}/admin/medicine/${id}`, data)
      .then((res) => {
        if (res.status === 200) {
          return dispatch(getAllMedicine());
        } else {
          return dispatch(getAllMedicineFail());
        }
      })
      .catch((err) => dispatch(getAllMedicineFail()));
  };
};
export const deleteMedicine = (id) => {
  return (dispatch) => {
    dispatch(getAllMedicineStart());
    axios
      .delete(`${BASE_URL}/admin/medicine/${id}`)
      .then((res) => {
        if (res.status === 204) {
          return dispatch(getAllMedicine());
        } else {
          return dispatch(getAllMedicineFail());
        }
      })
      .catch((err) => dispatch(getAllMedicineFail()));
  };
};

export const getAllStatisticStart = () => {
  return {
    type: actionType.GET_ALL_STATISTIC_START,
  };
};

export const getAllStatisticSuccess = (data) => {
  return {
    type: actionType.GET_ALL_STATISTIC_SUCCESS,
    payload: data,
  };
};
export const getAllStatisticFail = () => {
  return {
    type: actionType.GET_ALL_STATISTIC_FAIL,
  };
};
export const getAllStatisticByMonthOfYear = (month, year) => {
  return (dispatch) => {
    dispatch(getAllStatisticStart());
    axios
      .get(`${BASE_URL}/admin/statistic?month=${month}&year=${year}`)
      .then((res) => {
        if (res.status === 200) {
          return dispatch(getAllStatisticSuccess(res.data));
        } else {
          return dispatch(getAllStatisticFail());
        }
      })
      .catch((err) => dispatch(getAllStatisticFail()));
  };
};
