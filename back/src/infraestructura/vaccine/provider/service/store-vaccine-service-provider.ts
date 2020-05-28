import { VaccineRepository } from 'src/dominio/usuario/puerto/repositorio/vaccine-repository';
import { StoreVaccineService } from 'src/dominio/usuario/servicio/store-vaccine-service';

export function storeVaccineServiceProvider(
  vaccineRepository: VaccineRepository,
) {
  return new StoreVaccineService(vaccineRepository);
}
