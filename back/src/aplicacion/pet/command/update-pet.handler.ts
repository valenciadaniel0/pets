import { UpdatePetService } from 'src/dominio/pet/service/update-pet-service';
import { Injectable } from '@nestjs/common';
import { StorePetCommand } from './store-pet.command';
import { Pet } from 'src/dominio/pet/model/pet';

@Injectable()
export class UpdatePetHandler {
  constructor(private readonly _updatePetService: UpdatePetService) {}

  async run(id: number,storePetCommand:StorePetCommand) {
    this._updatePetService.run(id,new Pet(storePetCommand.name,storePetCommand.birthDate,storePetCommand.vaccines));
  }
}
