import { Pet } from "../../../componentes/pets/model/Pet";

export const LIST_PETS = 'LIST_PETS';

interface listPetsAction {
  type: typeof LIST_PETS
  payload: Pet[]
  totalQuantity: number
}

export type PetsTypesActions =
    listPetsAction
