import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import GetByCarReducer from './features/GetByCarReducer';
import ElectricCarReducer from "./features/ElectricCarReducer"

const combineReducer = combineReducers({ElectricCarReducer, GetByCarReducer})

const store = createStore(combineReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
