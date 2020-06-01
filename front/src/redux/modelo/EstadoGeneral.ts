import { EstadoProducto } from "./EstadoProducto";
import { PetsStatus } from "./PetsStatus";
import { VaccinesStatus } from "./VaccinesStatus";
import { VaccineStatus } from "./VaccineStatus";
import { PetStatus } from "./PetStatus";

export interface EstadoGeneral {
  productos: EstadoProducto;
  pets: PetsStatus;
  vaccines:VaccinesStatus;
  vaccine:VaccineStatus;
  pet:PetStatus
}
