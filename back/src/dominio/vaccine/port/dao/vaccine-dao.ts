import { VaccineDto } from 'src/aplicacion/vaccine/query/dto/vaccine.dto';

export abstract class VaccineDao {
  abstract async findAll(): Promise<VaccineDto[]>;
  abstract async findByPetId(petId: number): Promise<VaccineDto[]>;
}
