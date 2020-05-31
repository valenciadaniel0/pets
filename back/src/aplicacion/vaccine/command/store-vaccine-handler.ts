import { Injectable } from '@nestjs/common';
import { StoreVaccineService } from 'src/dominio/vaccine/service/store-vaccine-service';
import { StoreVaccineCommand } from './store-vaccine.command';
import { Vaccine } from 'src/dominio/vaccine/model/vaccine';

@Injectable()
export class StoreVaccineHandler {
  constructor(private readonly _storeVaccineService: StoreVaccineService) {}

  async run(storeVaccineCommand: StoreVaccineCommand) {
    await this._storeVaccineService.run(
      new Vaccine(
        storeVaccineCommand.name,
        storeVaccineCommand.date,
        storeVaccineCommand.pet,
      ),
    );
  }
}
