import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/index.scss";
import { Provider } from "react-redux";
import { configure as configureStore } from "store";
import * as serviceWorker from "./serviceWorker";
import Routes from "./routes";

const store = configureStore({});

const render = Component => {
  ReactDOM.render(
    <Provider {...{ store }}>
      <Component {...{ store }} />
    </Provider>,
    document.getElementById("root")
  );
};

render(Routes);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
