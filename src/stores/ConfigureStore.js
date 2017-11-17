import { createStore } from "redux";
import rootReducer  from "../reducers";

const configureStore = function(preloadedState){
    return createStore(
        rootReducer,
        preloadedState
    );
}

export default configureStore;