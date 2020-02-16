// import { FETCH_SERVICES } from "types";
import ServiceActions from "store/actions/services";
import { combineReducers } from "redux";
// const INITIAL_STATE = {
//   items: [],
// };

const initServices = () => {
  const all = (state = [], action) => {
    switch (action.type) {
      // case ServiceActions.FetchServices.REQUEST:
      //   return { ...state, isFetched: false };
      // case ServiceActions.FetchServices.SUCCESS:
      //   return { ...state, items: action.payload, isFetched: true };
      case ServiceActions.FetchServices.SUCCESS:
        return action.payload;
      default:
        return state;
    }
  };

  const isFetched = (state = true, action) => {
    switch (action.type) {
      case ServiceActions.FetchServices.REQUEST:
        return false;
      case ServiceActions.FetchServices.SUCCESS:
        return true;
      default:
        return state;
    }
  };

  return combineReducers({ all, isFetched });
};

const services = initServices();

export default services;
