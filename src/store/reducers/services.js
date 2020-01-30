// import { FETCH_SERVICES } from "types";
import ServiceActions from "store/actions/services";

const INITIAL_STATE = {
  items: []
};

const servicesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ServiceActions.FetchServices.SUCCESS:
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

export default servicesReducer;
