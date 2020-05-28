import { PetDto } from 'src/aplicacion/usuario/consulta/dto/pet.dto';

export abstract class PetDao {
  abstract async find(id:number):Promise<PetDto>;
  abstract async findAll(): Promise<PetDto[]>;
}
