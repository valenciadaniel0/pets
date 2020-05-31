import { VaccineDao } from 'src/dominio/vaccine/port/dao/vaccine-dao';
import { VaccineMysqlDao } from '../../adapter/dao/vaccine-mysql-dao';

export const vaccineDaoProvider = {
  provide: VaccineDao,
  useClass: VaccineMysqlDao,
};
