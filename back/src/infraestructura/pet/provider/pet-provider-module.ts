import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PetEntity } from "../entity/pet.entity";
import { StorePetService } from "src/dominio/pet/service/store-pet-service";
import { PetRepository } from "src/dominio/pet/port/repository/pet-repository";
import { storePetServiceProvider } from "./service/store-pet-service-provider";
import { petRepositoryProvider } from "./repository/pet-repository-provider";
import { StorePetHandler } from "src/aplicacion/pet/command/store-pet.handler";
import { petDaoProvider } from "./dao/pet-dao.provider";
import { ListPetsHandler } from "src/aplicacion/pet/query/list-pets.handler";
import { PetDao } from "src/dominio/pet/port/dao/pet-dao";
import { FindPetHandler } from "src/aplicacion/pet/query/find-pet.handler";
import { DeletePetHandler } from "src/aplicacion/pet/command/delete-pet.handler";
import { DeletePetService } from "src/dominio/pet/service/delete-pet-service";
import { deletePetServiceProvider } from "./service/delete-pet-service-provider";

@Module({
    imports: [TypeOrmModule.forFeature([PetEntity])],
    providers: [
      { provide: StorePetService, inject: [PetRepository], useFactory: storePetServiceProvider },
      { provide: DeletePetService, inject: [PetRepository], useFactory: deletePetServiceProvider },
      petRepositoryProvider,      
      petDaoProvider,      
      StorePetHandler,
      ListPetsHandler,
      FindPetHandler,
      DeletePetHandler
    ],
    exports: [
      StorePetService,
      StorePetHandler,
      PetRepository,
      ListPetsHandler,
      FindPetHandler,
      DeletePetHandler,
      PetDao      
    ],
  })
  export class PetProviderModule {
  
  }