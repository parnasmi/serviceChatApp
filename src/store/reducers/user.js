// import { FETCH_SERVICES } from "types";
import ServiceActions from "store/actions/services";

const INITIAL_STATE = {
  services: [],
  isFetched: true
};

const { FetchUserServices } = ServiceActions;

const user = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case FetchUserServices.REQUEST:
      return { ...state, isFetched: false };
    case FetchUserServices.SUCCESS:
      return { ...state, isFetched: true, services: payload.services };
    case FetchUserServices.FAILURE:
      return { ...state, isFetched: true, services: payload.err };
    default:
      return state;
  }
};

export default user;
