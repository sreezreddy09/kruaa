import { createStore, applyMiddleware } from "redux";
import rootReducer  from "../reducers";
import promiseMiddleware from 'redux-thunk';

const configureStore = function(preloadedState){
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(
            promiseMiddleware
        )
    );
}

export default configureStore;