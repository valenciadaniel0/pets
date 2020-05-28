import { VaccineRepository } from 'src/dominio/usuario/puerto/repositorio/vaccine-repository';
import { InjectRepository } from '@nestjs/typeorm';
import { VaccineEntity } from '../../entity/vaccine.entity';
import { Repository } from 'typeorm';
import { Vaccine } from 'src/dominio/usuario/modelo/vaccine';
import { PetEntity } from 'src/infraestructura/pet/entity/pet.entity';

export class VaccineMysqlRepository implements VaccineRepository {
  constructor(
    @InjectRepository(VaccineEntity)
    private readonly repository: Repository<VaccineEntity>,
  ) {}

  async save(vaccine: Vaccine) {
    const entity = new VaccineEntity();
    entity.name = vaccine.name;
    entity.date = vaccine.date;
    let petEntity: PetEntity = new PetEntity();
    petEntity.id = vaccine.pet.id;
    entity.pet = petEntity;
    await this.repository.save(entity);
  }
}
