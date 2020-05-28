import { combineReducers } from "redux";
import productos from "./productos.reductor";
import pets from "./pets.reducer";

export default combineReducers({ productos, pets });
