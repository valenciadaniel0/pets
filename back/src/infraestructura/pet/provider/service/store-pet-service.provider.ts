import { PetRepository } from 'src/dominio/pet/port/repository/pet-repository';
import { StorePetService } from 'src/dominio/pet/service/store-pet-service';

export function storePetServiceProvider(petRepository: PetRepository) {
  return new StorePetService(petRepository);
}
