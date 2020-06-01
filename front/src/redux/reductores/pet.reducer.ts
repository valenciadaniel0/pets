import { PetStatus } from "../modelo/PetStatus";
import {
  FIND_PET,
  PetsTypesActions,
} from "../acciones/pets/pets-types-actions";

const initialState: PetStatus = {
  pet: { id: 0, name: "", birthDate: new Date() },
};

export default function (
  state = initialState,
  action: PetsTypesActions
): PetStatus {
  switch (action.type) {
    case FIND_PET: {
      const pet = action.payload;
      return {
        ...state,
        pet: pet,
      };
    }

    default:
      return state;
  }
}
