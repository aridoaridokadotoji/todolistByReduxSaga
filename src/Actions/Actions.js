import {
  UPDATE_VALUE,
  TASK_SAVE_REQUESTED,
  TASK_LIST_FETCH_REQUESTED,
  TASK_CHANGE_REQUESTED,
  TASK_DELETE_REQUESTED
} from './Types'
import firebase from 'firebase'

export function updateTask ({ prop, value }) {
  return {
    type: UPDATE_VALUE,
    payload: { prop, value }
  }
}

export function saveTask ({ id, value, complete }) {
  return {
    type: TASK_SAVE_REQUESTED,
    payload: { id, value, complete }
  }
}

export function fetchTaskList () {
  return {
    type: TASK_LIST_FETCH_REQUESTED
  }
}

export function toggleCompleteStatus (id, complete) {
  return {
    type: TASK_CHANGE_REQUESTED,
    payload: { id, complete }
  }
}

export function deleteTask (id) {
  console.log('Id in action..', id)
  return {
    type: TASK_DELETE_REQUESTED,
    payload: id
  }
}
