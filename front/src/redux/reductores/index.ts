import { combineReducers } from "redux";
import productos from "./productos.reductor";
import pets from "./pets.reducer";
import pet from "./pet.reducer";
import vaccines from "./vaccines.reducer";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  productos,
  pets,
  vaccines,
  pet,
  form: formReducer,
});
