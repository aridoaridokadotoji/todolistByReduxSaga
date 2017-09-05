import {
  TASK_SAVE_REQUESTED,
  TASK_LIST_FETCH_REQUESTED,
  TASK_LIST_FETCH_SUCCESSED,
  TASK_LIST_FETCH_FAILED,
  TASK_SAVE_FAILED,
  TASK_CHANGE_REQUESTED,
  TASK_CHANGE_FAILED,
  TASK_DELETE_REQUESTED,
  TASK_DELETE_FAILED
} from '../Actions/Types'
import { call, put, takeLatest, select } from 'redux-saga/effects'
import { saveTaskToFB, getTaskList, saveTaskListToFB } from '../Api'
import getFilteredForChangeTaskList from '../selectors/filteredForChange'
import getFilteredForDeleteTaskList from '../selectors/filteredForDelete'
export function * saveTask (action) {
  console.log('saga')
  try {
    yield call(saveTaskToFB, action.payload)
    yield put({
      type: TASK_LIST_FETCH_REQUESTED
    })
  } catch (e) {
    console.log(e)
    yield put({ type: TASK_SAVE_FAILED, message: e.message })
  }
}

export function * fetchTaskList (action) {
  try {
    const tasks = yield call(getTaskList)
    yield put({
      type: TASK_LIST_FETCH_SUCCESSED,
      payload: tasks
    })
  } catch (e) {
    yield put({ type: TASK_LIST_FETCH_FAILED, message: e.message })
  }
}

export function * toggleCompleteStatus (action) {
  try {
    const newTasks = yield select(
      getFilteredForChangeTaskList,
      action.payload.id,
      action.payload.complete
    )
    console.log('try')
    console.log(newTasks)
    yield call(saveTaskListToFB, newTasks)

    yield put({
      type: TASK_LIST_FETCH_REQUESTED
    })
  } catch (e) {
    console.log(e)
    yield put({ type: TASK_CHANGE_FAILED, message: e.message })
  }
}

export function * deleteTask (action) {
  try {
    const newTasks = yield select(getFilteredForDeleteTaskList, action.payload)
    console.log('After delete..', newTasks)

    yield call(saveTaskListToFB, newTasks)

    yield put({
      type: TASK_LIST_FETCH_REQUESTED
    })
  } catch (e) {
    console.log(e)
    yield put({ type: TASK_DELETE_FAILED, message: e.message })
  }
}

export function * watchManageTaskListSaga () {
  yield takeLatest(TASK_SAVE_REQUESTED, saveTask)
  yield takeLatest(TASK_LIST_FETCH_REQUESTED, fetchTaskList)
  yield takeLatest(TASK_CHANGE_REQUESTED, toggleCompleteStatus)
  yield takeLatest(TASK_DELETE_REQUESTED, deleteTask)
}
