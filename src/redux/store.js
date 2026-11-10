import { createStore, applyMiddleware, combineReducers } from 'redux';
//import { composeWithDevTools } from 'redux-devtools-extension';
import { thunk } from 'redux-thunk';
import { carReducer } from './reducers/carReducer';
import { alertsReducer } from './reducers/alertsReducer';
import { bookingReducer } from './reducers/bookingReducer';
// const composeEnhancers = composeWithDevTools({
  
// });

const rootReducer = combineReducers({
    carReducer,
    alertsReducer,
    bookingReducer,
});

const store = createStore(
  rootReducer,
    applyMiddleware(thunk)
);

export default store