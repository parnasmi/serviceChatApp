import ServiceActions from "store/actions/services";
import { combineReducers } from "redux";

const initSelectedReducer = () => {
  const item = (state = {}, action) => {
    switch (action.type) {
      case ServiceActions.FetchServicesSelected.SUCCESS:
        return action.payload.service;
      default:
        return state;
    }
  };

  const isFetched = (state = true, action) => {
    switch (action.type) {
      case ServiceActions.FetchServicesSelected.REQUEST:
        return false;
      default:
        return true;
    }
  };

  return combineReducers({ item, isFetched });
};

const serviceItem = initSelectedReducer();

export default serviceItem;
