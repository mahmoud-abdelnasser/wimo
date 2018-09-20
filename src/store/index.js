import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import tasks from "../reducers/tasks";
const middlewares = [thunk];

const store = createStore(
    combineReducers({
      tasks: tasks,
    }),
    compose(applyMiddleware(...middlewares), window.devToolsExtension ? window.devToolsExtension() : f => f)
  );
  ;
export default store;