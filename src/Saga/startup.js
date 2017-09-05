import { put } from "redux-saga/effects";
import { fetchTaskList } from "../Actions/Actions";

export default function* startup() {
  yield put(fetchTaskList());
}
