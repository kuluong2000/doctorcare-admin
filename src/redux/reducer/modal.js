import * as actionType from '../actionType';
const initialState = {
  data: [],
  modal: { show: false },
  loading: false,
};

export function modal(state = initialState, action) {
  switch (action.type) {
    case actionType.OPEN_MODAL:
      return {
        ...state,
        modal: { show: true, ...action.payload },
        data: action.payload,
        loading: false,
      };
    case actionType.CLOSE_MODAL:
      return {
        ...state,
        modal: { show: false },
      };
    default:
      return state;
  }
}
