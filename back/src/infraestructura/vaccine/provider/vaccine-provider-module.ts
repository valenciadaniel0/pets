import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VaccineEntity } from '../entity/vaccine.entity';
import { StoreVaccineService } from 'src/dominio/vaccine/service/store-vaccine-service';
import { VaccineRepository } from 'src/dominio/vaccine/port/repository/vaccine-repository';
import { storeVaccineServiceProvider } from './service/store-vaccine-service-provider';
import { vaccineRepositoryProvider } from './repository/vaccine-repository-provider';
import { StoreVaccineHandler } from 'src/aplicacion/vaccine/command/store-vaccine-handler';
import { ListVaccinesHandler } from 'src/aplicacion/vaccine/query/list-vaccines.handler';
import { VaccineDao } from 'src/dominio/vaccine/port/dao/vaccine-dao';
import { vaccineDaoProvider } from './dao/vaccine-dao.provider';
import { ListVaccinesByPetHandler } from 'src/aplicacion/vaccine/query/list-vaccines-by-pet.handler';
import { DeleteVaccineService } from 'src/dominio/vaccine/service/delete-vaccine-service';
import { deleteVaccineServiceProvider } from './service/delete-vaccine-service-provider';
import { DeleteVaccineHandler } from 'src/aplicacion/vaccine/command/delete-vaccine.handler';

@Module({
  imports: [TypeOrmModule.forFeature([VaccineEntity])],
  providers: [
    {
      provide: StoreVaccineService,
      inject: [VaccineRepository],
      useFactory: storeVaccineServiceProvider,
    },
    {
      provide: DeleteVaccineService,
      inject: [VaccineRepository],
      useFactory: deleteVaccineServiceProvider,
    },
    vaccineRepositoryProvider,
    StoreVaccineHandler,
    DeleteVaccineHandler,
    vaccineDaoProvider,
    ListVaccinesHandler,
    ListVaccinesByPetHandler,
  ],
  exports: [
    StoreVaccineService,
    StoreVaccineHandler,
    DeleteVaccineHandler,
    DeleteVaccineService,
    VaccineRepository,
    ListVaccinesHandler,
    ListVaccinesByPetHandler,
    VaccineDao,
  ],
})
export class VaccineProviderModule {}
