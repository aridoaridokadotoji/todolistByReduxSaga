import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import app from "../Reducers";
import saga from "../Saga";

const store = null;
const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
  if (!store) {
    console.log("Store is created.");
    store = createStore(app, applyMiddleware(sagaMiddleware));
  }
  sagaMiddleware.run(saga);
  return store;
}
