import { VaccineRepository } from 'src/dominio/vaccine/port/repository/vaccine-repository';
import { StoreVaccineService } from 'src/dominio/vaccine/service/store-vaccine-service';

export function storeVaccineServiceProvider(
  vaccineRepository: VaccineRepository,
) {
  return new StoreVaccineService(vaccineRepository);
}
