import { combineReducers } from 'redux';

import {
  tasksList
} from './taskReducer';


const rootReducer = combineReducers({
  tasksList
});

export default rootReducer;
