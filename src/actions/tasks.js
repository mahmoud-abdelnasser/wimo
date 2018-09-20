import axios from 'axios';
export const TASKS_SUCCESS = 'tasks_success';
export const TASKS_FAILURE = 'tasks_failure';
export const TASKS_LOADING = 'tasks_loading';


export const fetchTasks = () => {
  return async dispatch => {
    try {
      dispatch({ type: TASKS_LOADING, status:true });
      await axios.get(`https://api.myjson.com/bins/b9ix6`).then(res=>{
        console.log('response ',res.data.tasks);
        dispatch({ type: TASKS_LOADING, status:false });
        dispatch({ type: TASKS_SUCCESS, payload: res.data.tasks });
      });
    } catch (error) {
      dispatch({ type: TASKS_LOADING, status:false });
      dispatch({ type: TASKS_FAILURE });
    }
  };
};
