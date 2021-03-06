import {
  UPDATE_VALUE,
  TASK_LIST_FETCH_SUCCESSED,
  TASK_LIST_FETCH_REQUESTED,
  TASK_LIST_FETCH_FAILED,
  TASK_SAVE_SUCCESSED,
  TASK_CHANGE_SUCCESSED,
  TASK_DELETE_REQUESTED,
  TASK_DELETE_SUCCESSED
} from '../Actions/Types'

const INITIAL_STATE = {
  id: 0,
  value: '',
  complete: false,
  render: false,
  tasks: [],
  processing: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_VALUE:
      return { ...state, [action.payload.prop]: action.payload.value }

    case TASK_LIST_FETCH_REQUESTED:
      return { ...state, processing: true }

    case TASK_LIST_FETCH_SUCCESSED:
      return {
        ...state,
        tasks: action.payload,
        processing: false,
        render: true
      }
    case TASK_CHANGE_SUCCESSED:
    case TASK_SAVE_SUCCESSED:
    case TASK_DELETE_SUCCESSED:

    default:
      return state
  }
}
