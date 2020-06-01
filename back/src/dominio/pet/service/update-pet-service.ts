import { PetRepository } from '../port/repository/pet-repository';
import { Pet } from '../model/pet';

export class UpdatePetService {
  constructor(private readonly _petRepository: PetRepository) {}

  async run(id: number, pet: Pet) {
    await this._petRepository.update(id, pet);
  }
}
