import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PetEntity } from "../entity/pet.entity";
import { StorePetService } from "src/dominio/usuario/servicio/store-pet-service";
import { PetRepository } from "src/dominio/usuario/puerto/repositorio/pet-repository";
import { storePetServiceProvider } from "./service/store-pet-service-provider";
import { petRepositoryProvider } from "./repository/pet-repository-provider";
import { StorePetHandler } from "src/aplicacion/usuario/comando/store-pet.handler";
import { petDaoProvider } from "./dao/pet-dao.provider";
import { ListPetsHandler } from "src/aplicacion/usuario/consulta/list-pets.handler";
import { PetDao } from "src/dominio/usuario/puerto/dao/pet-dao";
import { FindPetHandler } from "src/aplicacion/usuario/consulta/find-pet.handler";

@Module({
    imports: [TypeOrmModule.forFeature([PetEntity])],
    providers: [
      { provide: StorePetService, inject: [PetRepository], useFactory: storePetServiceProvider },
      petRepositoryProvider,      
      petDaoProvider,
      StorePetHandler,
      ListPetsHandler,
      FindPetHandler
    ],
    exports: [
      StorePetService,
      StorePetHandler,
      PetRepository,
      ListPetsHandler,
      FindPetHandler,
      PetDao      
    ],
  })
  export class PetProviderModule {
  
  }