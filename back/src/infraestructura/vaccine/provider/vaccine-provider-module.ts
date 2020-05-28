import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VaccineEntity } from "../entity/vaccine.entity";
import { StoreVaccineService } from "src/dominio/usuario/servicio/store-vaccine-service";
import { VaccineRepository } from "src/dominio/usuario/puerto/repositorio/vaccine-repository";
import { storeVaccineServiceProvider } from "./service/store-vaccine-service-provider";
import { vaccineRepositoryProvider } from "./repository/vaccine-repository-provider";
import { StoreVaccineHandler } from "src/aplicacion/usuario/comando/store-vaccine-handler";

@Module({
    imports: [TypeOrmModule.forFeature([VaccineEntity])],
    providers: [
      { provide: StoreVaccineService, inject: [VaccineRepository], useFactory: storeVaccineServiceProvider },
      vaccineRepositoryProvider,      
      StoreVaccineHandler      
    ],
    exports: [
      StoreVaccineService,
      StoreVaccineHandler,
      VaccineRepository      
    ],
  })
  export class VaccineProviderModule {
  
  }