import { VaccineRepository } from 'src/dominio/usuario/puerto/repositorio/vaccine-repository';
import { VaccineMysqlRepository } from '../../adapter/repository/vaccine-mysql-repository';

export const vaccineRepositoryProvider = {
  provide: VaccineRepository,
  useClass: VaccineMysqlRepository,
};
