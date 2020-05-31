import { Vaccine } from "../../../componentes/vaccines/model/Vaccine";

export const LIST_VACCINES = "LIST_VACCINES";
export const SAVE_VACCINE = "SAVE_VACCINE";
export const DELETE_VACCINE = "DELETE_VACCINE";

interface listVaccinesAction {
  type: typeof LIST_VACCINES;
  payload: Vaccine[];
  totalQuantity: number;
}

interface saveVaccineAction {
  type: typeof SAVE_VACCINE;
  payload: Vaccine[];
  totalQuantity: number;
}

interface deleteVaccineAction {
  type: typeof DELETE_VACCINE;
  payload: Vaccine[];
  totalQuantity: number;
}

export type VaccinesTypesActions =
  | listVaccinesAction
  | saveVaccineAction
  | deleteVaccineAction;
