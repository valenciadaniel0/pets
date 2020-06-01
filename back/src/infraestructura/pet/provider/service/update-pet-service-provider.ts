import { PetRepository } from 'src/dominio/pet/port/repository/pet-repository';
import { UpdatePetService } from 'src/dominio/pet/service/update-pet-service';

export function updatePetServiceProvider(petRepository: PetRepository) {
  return new UpdatePetService(petRepository);
}