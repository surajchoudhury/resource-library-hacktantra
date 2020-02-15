import { createStore } from "redux";
import rootReducer from "../Reducers/rootReducer";
import { applyMiddleware } from "redux";
import Thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(Thunk));

export default store;
