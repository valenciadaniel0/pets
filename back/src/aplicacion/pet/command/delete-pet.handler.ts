import { DeletePetService } from 'src/dominio/pet/service/delete-pet-service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeletePetHandler {
  constructor(private readonly _deletePetService: DeletePetService) {}

  async run(id: number) {
    await this._deletePetService.run(id);
  }
}
