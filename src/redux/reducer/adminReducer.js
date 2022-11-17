import * as actionType from './../actionType';
const initialState = [
  {
    loading: false,
    dataDoctor: [],
    dataDepartment: [],
    dataDiseases: [],
    dataPosition: [],
    booking: [],
  },
];
export function adminReducer(state = initialState, action) {
  switch (action.type) {
    case actionType.GET_ALL_BOOKING_START:
      return {
        ...state,
        loading: true,
      };
    case actionType.GET_ALL_BOOKING_SUCCESS:
      return {
        ...state,
        booking: action.payload,
        loading: false,
      };
    case actionType.GET_ALL_BOOKING_FAIL:
      return {
        ...state,
        loading: false,
      };

    case actionType.GET_ALL_DOCTOR_START:
      return {
        ...state,
        loading: true,
      };
    case actionType.GET_ALL_DOCTOR_SUCCESS:
      return {
        ...state,
        dataDoctor: action.payload,
        loading: false,
      };
    case actionType.GET_ALL_DOCTOR_FAIL:
      return {
        ...state,
        loading: false,
      };
    case actionType.GET_ALL_DEPARTMENT_START:
      return {
        ...state,
        loading: true,
      };

    case actionType.GET_ALL_DEPARTMENT_SUCCESS:
      return {
        ...state,
        dataDepartment: action.payload,
        loading: false,
      };
    case actionType.GET_ALL_DEPARTMENT_FAIL:
      return {
        ...state,
        loading: false,
      };
    case actionType.GET_ALL_DISEASES_START: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionType.GET_ALL_DISEASES_SUCCESS: {
      return {
        ...state,
        dataDiseases: action.payload,
        loading: false,
      };
    }
    case actionType.GET_ALL_DISEASES_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    //Position
    case actionType.GET_ALL_POSITION_START: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionType.GET_ALL_POSITION_SUCCESS: {
      return {
        ...state,
        dataPosition: action.payload,
        loading: false,
      };
    }
    case actionType.GET_ALL_POSITION_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }

    default:
      return state;
  }
}
