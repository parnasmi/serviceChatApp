import { createStore, compose, applyMiddleWare } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers";
import rootSaga from "./sagas";

import middlewares, { sagaMiddleware } from "./middleWares";

export default (initialState = {}) => {
  let store;

  if (process.env.NODE_ENV === "production") {
    store = createStore(
      rootReducer,
      initialState,
      compose(applyMiddleWare(...middlewares))
    );
  } else {
    store = createStore(
      rootReducer,
      composeWithDevTools(applyMiddleWare(...middlewares))
    );
  }

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept("./reducers", () => {
      store.replaceReducer(require("./reducers/index").default);
    });
  }

  return store;
};
