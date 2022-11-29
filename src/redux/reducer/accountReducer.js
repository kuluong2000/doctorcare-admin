import * as actionType from './../actionType';

const initialState = {
  accounts: [],
  loading: false,
};

export function accountReducer(state = initialState, action) {
  switch (action.type) {
    case actionType.GET_ALL_ACCOUNT_START:
      return {
        ...state,
        loading: true,
      };
    case actionType.GET_ALL_ACCOUNT_SUCCESS:
      return {
        ...state,
        accounts: action.payload,
        loading: false,
      };
    case actionType.GET_ALL_ACCOUNT_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
