import { PetRepository } from '../port/repository/pet-repository';
import { Pet } from '../model/pet';

export class StorePetService {
  constructor(private readonly _petRepository: PetRepository) {}
  async run(pet: Pet) {
    await this._petRepository.save(pet);
  }
}
