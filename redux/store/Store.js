import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import RootReducer from '../reducers/RootReducer';

const initialState = {};
const middleware = [thunk];

const Store = createStore(RootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default Store;