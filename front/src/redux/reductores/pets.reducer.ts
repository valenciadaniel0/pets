import { Pet } from "../../componentes/pets/model/Pet";
import {
  LIST_PETS,
  PetsTypesActions,
} from "../acciones/pets/pets-types-actions";
import { PetStatus } from "../modelo/PetStatus";


const initialState: PetStatus = {
  pets: Array<Pet>(),
  totalQuantity: 0,
};

export default function (
  state = initialState,
  action: PetsTypesActions
): PetStatus {
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
