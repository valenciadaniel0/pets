import { PetRepository } from 'src/dominio/usuario/puerto/repositorio/pet-repository';
import { StorePetService } from 'src/dominio/usuario/servicio/store-pet-service';

export function storePetServiceProvider(petRepository: PetRepository) {
  return new StorePetService(petRepository);
}
