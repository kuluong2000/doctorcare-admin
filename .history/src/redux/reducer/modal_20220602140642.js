import * as actionType from "../actionType";
const initialState = {
  modal: { show: false },
  comp: [],
};

export function modal(state = initialState, action) {
  switch (action.type) {
    case actionType.OPEN_MODAL:
      return {
        ...state,
        modal: { show: true },
        comp: action.payload,
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
