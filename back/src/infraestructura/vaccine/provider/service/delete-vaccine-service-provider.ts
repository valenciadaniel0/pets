import { VaccineRepository } from 'src/dominio/vaccine/port/repository/vaccine-repository';
import { DeleteVaccineService } from 'src/dominio/vaccine/service/delete-vaccine-service';

export function deleteVaccineServiceProvider(
  vaccineRepository: VaccineRepository,
) {
  return new DeleteVaccineService(vaccineRepository);
}
