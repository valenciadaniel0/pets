import { VaccineRepository } from '../port/repository/vaccine-repository';

export class DeleteVaccineService {
  constructor(private readonly _vaccineRepository: VaccineRepository) {}

  async run(id: number) {
    await this._vaccineRepository.delete(id);
  }
}
