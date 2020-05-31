import { PetRepository } from 'src/dominio/pet/port/repository/pet-repository';
import { PetMysqlRepository } from 'src/infraestructura/pet/adapter/repository/pet-mysql-repository';

export const petRepositoryProvider = {
  provide: PetRepository,
  useClass: PetMysqlRepository,
};
