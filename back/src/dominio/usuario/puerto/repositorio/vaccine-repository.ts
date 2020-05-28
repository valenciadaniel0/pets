import { Vaccine } from "../../modelo/vaccine";

export abstract class VaccineRepository{
    abstract async save(vaccine: Vaccine);
}