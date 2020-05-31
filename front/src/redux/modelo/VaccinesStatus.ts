import { Vaccine } from "../../componentes/vaccines/model/Vaccine";

export interface VaccinesStatus {
    vaccines: Vaccine[];
    totalQuantity: number;  
  }