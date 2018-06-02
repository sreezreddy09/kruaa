import { createStore, applyMiddleware } from "redux";
import rootReducer  from "../reducers";
import  createLogger  from 'redux-logger';
import promiseMiddleware from 'redux-thunk';

const configureStore = function(preloadedState){
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(
            promiseMiddleware,
            createLogger
        )
    );
}

export default configureStore;