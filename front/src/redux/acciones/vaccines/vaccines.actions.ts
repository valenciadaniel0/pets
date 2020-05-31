import { Vaccine } from "../../../componentes/vaccines/model/Vaccine";
import {
  VaccinesTypesActions,
  LIST_VACCINES,
  SAVE_VACCINE,
  DELETE_VACCINE,
} from "./vaccines-types-actions";
import { VaccineRepository } from "../../../api/vaccines.repository";

export function listVaccines(
  vaccines: Array<Vaccine>,
  totalQuantity: number
): VaccinesTypesActions {
  return {
    type: LIST_VACCINES,
    payload: vaccines,
    totalQuantity: totalQuantity,
  };
}

export function saveVaccine(
  vaccines: Array<Vaccine>,
  totalQuantity: number
): VaccinesTypesActions {
  return {
    type: SAVE_VACCINE,
    payload: vaccines,
    totalQuantity: totalQuantity,
  };
}

export function deleteVaccine(
  vaccines: Array<Vaccine>,
  totalQuantity: number
): VaccinesTypesActions {
  return {
    type: DELETE_VACCINE,
    payload: vaccines,
    totalQuantity: totalQuantity,
  };
}

export function listVaccinesAsync(pageNumber: number, petId: number) {
  return function (dispacth: any) {
    VaccineRepository.getByPage(pageNumber, petId).then((response: any) => {
      dispacth(listVaccines(response.data, response.data.length));
    });
  };
}

export function saveVaccineAsync(formValues: any) {
  return function (dispacth: any) {
    VaccineRepository.saveVaccine(formValues).then((response: any) => {
      VaccineRepository.getByPage(1, formValues.pet.id).then(
        (responseList: any) => {
          dispacth(deleteVaccine(responseList.data, responseList.data.length));
        }
      );
    });
  };
}

export function deleteVaccineAsync(id: number, petId: number) {
  return function (dispacth: any) {
    VaccineRepository.deleteVaccine(id).then((response: any) => {
      VaccineRepository.getByPage(1, petId).then((responseList: any) => {
        dispacth(deleteVaccine(responseList.data, responseList.data.length));
      });
    });
  };
}
