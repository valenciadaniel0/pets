import { VaccinesStatus } from "../modelo/VaccinesStatus";
import { Vaccine } from "../../componentes/vaccines/model/Vaccine";
import {
  LIST_VACCINES,
  VaccinesTypesActions,
  DELETE_VACCINE,
  SAVE_VACCINE,
} from "../acciones/vaccines/vaccines-types-actions";

const initialState: VaccinesStatus = {
  vaccines: Array<Vaccine>(),
  totalQuantity: 0,
};

export default function (
  state = initialState,
  action: VaccinesTypesActions
): VaccinesStatus {
  switch (action.type) {
    case LIST_VACCINES: {
      const vaccines = action.payload;
      return {
        ...state,
        vaccines: vaccines,
        totalQuantity: action.totalQuantity,
      };
    }

    case DELETE_VACCINE: {
      const vaccines = action.payload;
      return {
        ...state,
        vaccines: vaccines,
        totalQuantity: action.totalQuantity,
      };
    }

    case SAVE_VACCINE: {
      const vaccines = action.payload;
      return {
        ...state,
        vaccines: vaccines,
        totalQuantity: action.totalQuantity,
      };
    }

    default:
      return state;
  }
}
