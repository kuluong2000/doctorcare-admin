import * as actionType from "./../actionType";
const initialState = [
  {
    loading: false,
    data: [],
  },
];
export function adminReducer(state = initialState, action) {
  switch (action.type) {
    case actionType.GET_ALL_DEPARTMENT_START:
      return {
        ...state,
        loading: true,
      };

    case actionType.GET_ALL_DEPARTMENT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
