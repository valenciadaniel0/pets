import { Pet } from "../../componentes/pets/model/Pet";
import {
  LIST_PETS,
  SAVE_PET,
  PetsTypesActions,
} from "../acciones/pets/pets-types-actions";
import { PetsStatus } from "../modelo/PetsStatus";


const initialState: PetsStatus = {
  pets: Array<Pet>(),
  totalQuantity: 0  
};

export default function (
  state = initialState,
  action: PetsTypesActions
): PetsStatus {
  switch (action.type) {
    case LIST_PETS: {
      const pets = action.payload;
      return {
        ...state,
        pets: pets,
        totalQuantity: action.totalQuantity,
      };
    }
    
    default:
      return state;
  }
}
