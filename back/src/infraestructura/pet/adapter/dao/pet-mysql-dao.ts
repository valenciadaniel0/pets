import { PetDao } from 'src/dominio/pet/port/dao/pet-dao';
import { PetDto } from 'src/aplicacion/pet/query/dto/pet.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PetMysqlDao implements PetDao {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}
  async find(id: number): Promise<PetDto> {
    return await this.entityManager.query(
      `SELECT p.id,p.name, p.birthDate FROM pets p WHERE p.id=${id} LIMIT 1`,
    );
  }
  async findAll(): Promise<PetDto[]> {
    return await this.entityManager.query('SELECT * FROM pets p');
  }
}
