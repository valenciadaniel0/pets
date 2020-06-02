import { PetRepository } from 'src/dominio/pet/port/repository/pet-repository';
import { DeletePetService } from 'src/dominio/pet/service/delete-pet-service';

export function deletePetServiceProvider(petRepository: PetRepository) {
  return new DeletePetService(petRepository);
}
