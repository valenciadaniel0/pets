import { EstadoProducto } from "./EstadoProducto";
import { PetsStatus } from "./PetsStatus";
import { VaccinesStatus } from "./VaccinesStatus";
import { VaccineStatus } from "./VaccineStatus";

export interface EstadoGeneral {
  productos: EstadoProducto;
  pets: PetsStatus;
  vaccines:VaccinesStatus,
  vaccine:VaccineStatus
}
