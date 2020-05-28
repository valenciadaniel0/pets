import { VaccineRepository } from '../puerto/repositorio/vaccine-repository';
import { Vaccine } from '../modelo/vaccine';

export class StoreVaccineService {
  constructor(private readonly _vaccineRepository: VaccineRepository) {}

  async run(vaccine: Vaccine) {
    await this._vaccineRepository.save(vaccine);
  }
}
