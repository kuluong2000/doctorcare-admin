import * as actionType from "../actionType";
const initialState = {
  data: [],
  loading: false,
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionType.DATA_USER:
      return {
        ...state,
        data: action.payload,
      };

    default:
      break;
  }
}
