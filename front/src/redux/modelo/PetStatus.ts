import { Pet } from "../../componentes/pets/model/Pet";

export interface PetStatus {
  pets: Pet[];
  totalQuantity: number;
}
