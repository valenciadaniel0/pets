import { Pet } from "../../modelo/pet";

export abstract class PetRepository {    
    abstract async petExists(id: number): Promise<boolean>;
    abstract async save(pet: Pet);
}