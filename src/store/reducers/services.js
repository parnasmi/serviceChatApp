// import { FETCH_SERVICES } from "types";
import ServiceActions from "store/actions/services";
const INITIAL_STATE = {
  items: [],
  isFetched: true
};

const services = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ServiceActions.FetchServices.REQUEST:
      return { ...state, isFetched: false };
    case ServiceActions.FetchServices.SUCCESS:
      return { ...state, items: action.payload.services, isFetched: true };
    case ServiceActions.FetchServices.FAILURE:
      return { ...state, error: action.payload.error, isFetched: true };
    default:
      return state;
  }
};

export default services;
