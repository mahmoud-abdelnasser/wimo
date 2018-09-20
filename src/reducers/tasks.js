import { initialState } from './initialStates';
import { TASKS_SUCCESS, TASKS_FAILURE, TASKS_LOADING } from '../actions/tasks';

export default (state = initialState.tasks, action) => {
  switch (action.type) {
    case TASKS_SUCCESS:
      return { ...state, success: true, payload: action.payload };
    case TASKS_FAILURE:
      return { ...state, success: false, error: 'No data found' };
    case TASKS_LOADING:
      return { ...state, loading: action.status };
    default:
      return state;
  }
};
