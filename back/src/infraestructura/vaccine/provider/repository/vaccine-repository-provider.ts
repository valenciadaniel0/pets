import { VaccineRepository } from 'src/dominio/vaccine/port/repository/vaccine-repository';
import { VaccineMysqlRepository } from '../../adapter/repository/vaccine-mysql-repository';

export const vaccineRepositoryProvider = {
  provide: VaccineRepository,
  useClass: VaccineMysqlRepository,
};
