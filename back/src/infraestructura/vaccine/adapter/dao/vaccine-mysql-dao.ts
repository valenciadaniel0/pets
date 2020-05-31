import { VaccineDao } from 'src/dominio/vaccine/port/dao/vaccine-dao';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { VaccineDto } from 'src/aplicacion/vaccine/query/dto/vaccine.dto';

export class VaccineMysqlDao implements VaccineDao {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}
  async findByPetId(petId: number): Promise<VaccineDto[]> {
    return await this.entityManager.query(
      `SELECT * FROM vaccines v WHERE petId=${petId}`,
    );
  }

  async findAll(): Promise<VaccineDto[]> {
    return await this.entityManager.query('SELECT * FROM vaccines v');
  }
}
