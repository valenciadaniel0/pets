import { PetDto } from 'src/aplicacion/usuario/consulta/dto/pet.dto';

export abstract class PetDao {
  abstract async findAll(): Promise<PetDto[]>;
}
