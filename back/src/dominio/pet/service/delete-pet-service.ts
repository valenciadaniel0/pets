import { PetRepository } from '../port/repository/pet-repository';

export class DeletePetService {
  constructor(private readonly _petRepository: PetRepository) {}

  async run(id: number) {
    await this._petRepository.delete(id);
  }
}
