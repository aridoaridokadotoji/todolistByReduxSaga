import { fork } from "redux-saga/effects";
import { watchManageTaskListSaga } from "./manageTaskListSaga";
import startup from "./startup";

const root = function* root() {
  yield [fork(watchManageTaskListSaga), fork(startup)];
};

export default root;
