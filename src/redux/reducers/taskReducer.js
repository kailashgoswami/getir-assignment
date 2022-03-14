import * as actionTypes from '../actions/actionTypes';

export function tasksList(state = [], action) {
  switch (action.type) {
    case actionTypes.TASKS_LIST:
      return action.payload.data;
    default:
      return state;
  }
}
