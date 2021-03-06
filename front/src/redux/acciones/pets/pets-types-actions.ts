import { Pet } from "../../../componentes/pets/model/Pet";

export const LIST_PETS = "LIST_PETS";
export const SAVE_PET = "SAVE_PET";
export const FIND_PET = "FIND_PET";
export const DELETE_PET = "DELETE_PET";
export const UPDATE_PET = "UPDATE_PET";

interface listPetsAction {
  type: typeof LIST_PETS;
  payload: Pet[];
  totalQuantity: number;
}

interface savePetAction {
  type: typeof SAVE_PET;
  payload: Pet[];
  totalQuantity: number;
}

interface updatePetAction {
  type: typeof UPDATE_PET;
  payload: Pet[];
  totalQuantity: number;
}

interface deletePetAction {
  type: typeof DELETE_PET;
  payload: Pet[];
  totalQuantity: number;
}

interface findPetAction {
  type: typeof FIND_PET;
  payload: Pet;
}

export type PetsTypesActions =
  | listPetsAction
  | savePetAction
  | findPetAction
  | deletePetAction
  | updatePetAction;
