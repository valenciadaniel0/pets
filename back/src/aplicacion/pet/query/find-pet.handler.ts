import { Injectable } from '@nestjs/common';
import { PetDao } from 'src/dominio/pet/port/dao/pet-dao';
import { PetDto } from './dto/pet.dto';

@Injectable()
export class FindPetHandler {
  constructor(private _petDao: PetDao) {}

  async run(id: number): Promise<PetDto> {
    return await this._petDao.find(id);
  }
}
