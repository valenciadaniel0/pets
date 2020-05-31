import { VaccineRepository } from '../port/repository/vaccine-repository';
import { Vaccine } from '../model/vaccine';

export class StoreVaccineService {
  constructor(private readonly _vaccineRepository: VaccineRepository) {}

  async run(vaccine: Vaccine) {
    await this._vaccineRepository.save(vaccine);
  }
}
