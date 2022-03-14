import * as actionType from './actionTypes';
import {
  TASKS_LIST,
} from '../../constants/API';
import { getRequest, postRequest, putRequest } from './index';

export function getTasksList() {
  return getRequest(TASKS_LIST, actionType.TASKS_LIST);
}

export function createTask(data) {
  return postRequest(TASKS_LIST, data, actionType.CREATE_TASK);
}

export function updateTask(data, id) {
  return putRequest(`${TASKS_LIST}/${id}`, data, actionType.CREATE_TASK);
}