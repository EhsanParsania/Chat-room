import { createStore } from "redux";
import rootReducers from "./reducer/index";

//here we create an object to store the current state of the application
/* eslint-disable no-underscore-dangle */
export const store = createStore(
  rootReducers, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-enable */
