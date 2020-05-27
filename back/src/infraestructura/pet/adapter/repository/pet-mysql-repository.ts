import { InjectRepository } from '@nestjs/typeorm';
import { PetRepository } from 'src/dominio/usuario/puerto/repositorio/pet-repository';
import { PetEntity } from '../../entity/pet.entity';
import { Pet } from 'src/dominio/usuario/modelo/pet';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PetMysqlRepository implements PetRepository {
  constructor(
    @InjectRepository(PetEntity)
    private readonly repository: Repository<PetEntity>,
  ) {}

  async save(pet: Pet) {
    const entity = new PetEntity();
    entity.name = pet.name;
    entity.birthDate = pet.birthDate;
    await this.repository.save(entity);
  }
}
