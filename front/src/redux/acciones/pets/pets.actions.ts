import { Pet } from "../../../componentes/pets/model/Pet";
import {
  PetsTypesActions,
  LIST_PETS,
  SAVE_PET,
  FIND_PET,
  DELETE_PET,
  UPDATE_PET,
} from "./pets-types-actions";
import { PetRepository } from "../../../api/pets.repository";

export function listPets(
  pets: Array<Pet>,
  totalQuantity: number
): PetsTypesActions {
  return {
    type: LIST_PETS,
    payload: pets,
    totalQuantity: totalQuantity,
  };
}

export function savePet(
  pets: Array<Pet>,
  totalQuantity: number
): PetsTypesActions {
  return {
    type: SAVE_PET,
    payload: pets,
    totalQuantity: totalQuantity,
  };
}

export function updatePet(
  pets: Array<Pet>,
  totalQuantity: number
): PetsTypesActions {
  return {
    type: UPDATE_PET,
    payload: pets,
    totalQuantity: totalQuantity,
  };
}

export function findPet(pet: Pet): PetsTypesActions {
  return {
    type: FIND_PET,
    payload: pet,
  };
}

export function deletePet(
  pets: Array<Pet>,
  totalQuantity: number
): PetsTypesActions {
  return {
    type: DELETE_PET,
    payload: pets,
    totalQuantity: totalQuantity,
  };
}

export function listPetsAsync(pageNumber: number) {
  return function (dispacth: any) {
    PetRepository.getByPage(pageNumber).then((response: any) => {
      dispacth(listPets(response.data, response.data.length));
    });
  };
}

export function deletePetAsync(id: number) {
  return function (dispacth: any) {
    PetRepository.deletePet(id).then((response: any) => {
      PetRepository.getByPage(1).then((listResponse: any) => {
        dispacth(deletePet(listResponse.data, listResponse.data.length));
      });
    });
  };
}

export function savePetAsync(formValues: any) {
  return function (dispacth: any) {
    PetRepository.savePet(formValues).then((response: any) => {
      PetRepository.getByPage(1).then((listResponse: any) => {
        dispacth(deletePet(listResponse.data, listResponse.data.length));
      });
    });
  };
}

export function updatePetAsync(id: number, formValues: any) {
  return function (dispacth: any) {
    PetRepository.updatePet(id, formValues).then((response: any) => {
      setTimeout(() => {
        PetRepository.getByPage(1).then((listResponse: any) => {
          dispacth(updatePet(listResponse.data, listResponse.data.length));
        });
      }, 1000);      
    });
  };
}

export function findPetAsync(id: number) {
  return function (dispacth: any) {
    PetRepository.findPet(id).then((response: any) => {
      dispacth(findPet(response.data[0]));
    });
  };
}
