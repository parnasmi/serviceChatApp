import requireContext from "require-context.macro";
import { combineReducers } from "redux";
import { importAll } from "store/utils";

const reducers = importAll(
  requireContext(".", true, /^\.\/(?!index)\w+$/),
  ".js"
);

const rootReducer = combineReducers({
  ...reducers
});

export default (state, action) =>
  action.type === "RESET/TRIGGER"
    ? rootReducer(undefined, action)
    : rootReducer(state, action);
