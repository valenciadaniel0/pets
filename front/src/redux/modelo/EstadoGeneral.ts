import { EstadoProducto } from "./EstadoProducto";
import { PetStatus } from "./PetStatus";

export interface EstadoGeneral {
  productos: EstadoProducto;
  pets: PetStatus;
}
