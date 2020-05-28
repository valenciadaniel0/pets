import { Injectable } from '@nestjs/common';
import { PetDao } from 'src/dominio/usuario/puerto/dao/pet-dao';
import { PetDto } from './dto/pet.dto';

@Injectable()
export class ListPetsHandler {
  constructor(private _petDao: PetDao) {}

  async run(): Promise<PetDto[]> {
    return await this._petDao.findAll();
  }
}
