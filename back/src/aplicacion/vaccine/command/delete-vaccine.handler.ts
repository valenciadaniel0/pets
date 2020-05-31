import { DeleteVaccineService } from 'src/dominio/vaccine/service/delete-vaccine-service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteVaccineHandler {
  constructor(private readonly _deleteVaccineService: DeleteVaccineService) {}

  async run(id: number) {
    await this._deleteVaccineService.run(id);
  }
}
