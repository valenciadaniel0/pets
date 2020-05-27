import { PetRepository } from 'src/dominio/usuario/puerto/repositorio/pet-repository';
import { PetMysqlRepository } from 'src/infraestructura/pet/adapter/repository/pet-mysql-repository';

export const petRepositoryProvider = {
  provide: PetRepository,
  useClass: PetMysqlRepository,
};
