import { Pet } from '../../model/pet';

export abstract class PetRepository {
  abstract async petExists(id: number): Promise<boolean>;
  abstract async save(pet: Pet);
  abstract async delete(id: number);
  abstract async update(id:number,pet:Pet);
}
