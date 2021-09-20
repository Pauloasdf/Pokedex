import ToasterReducer from "./ToasterReducer";
import { combineReducers } from "redux";

const RootReducer = combineReducers({
    ToasterReducer: ToasterReducer
});


export default RootReducer;