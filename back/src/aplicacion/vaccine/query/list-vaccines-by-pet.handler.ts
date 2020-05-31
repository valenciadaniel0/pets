import { Injectable } from '@nestjs/common';
import { VaccineDao } from 'src/dominio/vaccine/port/dao/vaccine-dao';
import { VaccineDto } from './dto/vaccine.dto';

@Injectable()
export class ListVaccinesByPetHandler {
  constructor(private _vaccineDao: VaccineDao) {}

  async run(petId: number): Promise<VaccineDto[]> {
    return this._vaccineDao.findByPetId(petId);
  }
}
