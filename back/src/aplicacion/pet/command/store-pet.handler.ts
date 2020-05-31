import { Injectable } from '@nestjs/common';
import { StorePetService } from 'src/dominio/pet/service/store-pet-service';
import { StorePetCommand } from './store-pet.command';
import { Pet } from 'src/dominio/pet/model/pet';

@Injectable()
export class StorePetHandler {
  constructor(private readonly _storePetService: StorePetService) {}

  async run(storePetCommand: StorePetCommand){
    await this._storePetService.run(
      new Pet(
        storePetCommand.name,
        storePetCommand.birthDate,
        storePetCommand.vaccines,
      ),
    );    
  }
}
