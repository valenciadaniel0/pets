import { InjectRepository } from '@nestjs/typeorm';
import { PetRepository } from 'src/dominio/pet/port/repository/pet-repository';
import { PetEntity } from '../../entity/pet.entity';
import { Pet } from 'src/dominio/pet/model/pet';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { VaccineEntity } from 'src/infraestructura/vaccine/entity/vaccine.entity';

@Injectable()
export class PetMysqlRepository implements PetRepository {
  constructor(
    @InjectRepository(PetEntity)
    private readonly repository: Repository<PetEntity>,
  ) {}
  async update(id: number, pet: Pet) {
    let petEntity: PetEntity = await this.repository.findOne({ id: id });
    petEntity.name = pet.name;
    petEntity.birthDate = pet.birthDate;
    petEntity.vaccines = [];
    await this.repository.save(petEntity);
  }
  async delete(id: number) {
    await this.repository.delete(id);
  }

  async find(id: number): Promise<Pet> {
    let petEntity: PetEntity = await this.repository.findOne({ id: id });    
    return new Pet(petEntity.name, petEntity.birthDate, []);
  }

  async petExists(id: number): Promise<boolean> {
    return (await this.repository.count({ id: id })) > 0;
  }

  async save(pet: Pet) {
    const petEntity = new PetEntity();
    petEntity.name = pet.name;
    petEntity.birthDate = pet.birthDate;
    await this.repository.save(petEntity);
  }
}
