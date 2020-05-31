import { EstadoProducto } from "./EstadoProducto";
import { PetsStatus } from "./PetsStatus";

export interface EstadoGeneral {
  productos: EstadoProducto;
  pets: PetsStatus;
}
