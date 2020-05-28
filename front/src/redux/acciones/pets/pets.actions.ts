import { Pet } from "../../../componentes/pets/model/Pet";
import { PetsTypesActions, LIST_PETS } from "./pets-types-actions";
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

export function listPetsAsync(pageNumber: number) {
  return function (dispacth: any) {
    PetRepository.getByPage(pageNumber).then((response: any) => {      
      dispacth(listPets(response.data, response.data.length));
    });
  };
}
