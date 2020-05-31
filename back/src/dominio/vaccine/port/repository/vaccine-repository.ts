import { Vaccine } from '../../model/vaccine';

export abstract class VaccineRepository {
  abstract async save(vaccine: Vaccine);
  abstract async delete(id: number);
}
