import { VaccineStatus } from "../modelo/VaccineStatus";
import {
  VaccinesTypesActions,  
} from "../acciones/vaccines/vaccines-types-actions";

const initialState: VaccineStatus = {
  vaccine: { id: 0, petId: 0, name: "", date: new Date() },
};

export default function (
  state = initialState,
  action: VaccinesTypesActions
): VaccineStatus {
  switch (action.type) {   
    default:
      return state;
  }
}
