import { PetRepository } from '../puerto/repositorio/pet-repository';
import { Pet } from '../modelo/pet';

export class StorePetService {
  constructor(private readonly _petRepository: PetRepository) {}
  async run(pet: Pet) {
    await this._petRepository.save(pet);
  }
}
