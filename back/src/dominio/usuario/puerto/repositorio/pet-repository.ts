import { Pet } from "../../modelo/pet";

export abstract class PetRepository {
    abstract async save(pet: Pet);
}