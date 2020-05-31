import * as request from 'supertest';
import { INestApplication, HttpStatus } from "@nestjs/common";
import { CustomSinonStubbedInstance, createCustomStubInstance } from "test/util/create-object.stub";
import { PetRepository } from "src/dominio/pet/port/repository/pet-repository";
import { PetDao } from "src/dominio/pet/port/dao/pet-dao";
import { PetMysqlRepository } from "src/infraestructura/pet/adapter/repository/pet-mysql-repository";
import { Test } from "@nestjs/testing";
import { PetController } from "src/infraestructura/pet/controller/pet-controller";
import { CeibaLogger } from "src/infraestructura/configuracion/ceiba-logger.config";
import { StorePetService } from "src/dominio/pet/service/store-pet-service";
import { storePetServiceProvider } from "src/infraestructura/pet/provider/service/store-pet-service-provider";
import { StorePetHandler } from "src/aplicacion/pet/command/store-pet.handler";
import { FiltroExcepcionesDeNegocio } from "src/infraestructura/excepciones/filtro-excepciones-negocio";
import { StorePetCommand } from "src/aplicacion/pet/command/store-pet.command";

describe('tests to pet controller', () => {

    let app: INestApplication;
    let petRepository: CustomSinonStubbedInstance<PetRepository>;
    let petDao: CustomSinonStubbedInstance<PetDao>;
  
    /**
     * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al levantar la prueba, traer una por una las dependencias)
     **/
    beforeAll(async () => {
      petRepository = createCustomStubInstance(PetMysqlRepository);      
      const moduleRef = await Test.createTestingModule({
        controllers: [PetController],
        providers: [
          CeibaLogger,
          {
            provide: StorePetService,
            inject: [PetRepository],
            useFactory: storePetServiceProvider,
          },
          { provide: PetRepository, useValue: petRepository },          
          StorePetHandler,          
        ],
      }).compile();
  
      app = moduleRef.createNestApplication();
      const logger = await app.resolve(CeibaLogger);
  
      app.useGlobalFilters(new FiltroExcepcionesDeNegocio(logger));
      await app.init();
    });
  
    beforeEach(() => {
  
      petRepository._resetStubs();      
  
    });
  
    afterAll(async () => {
      await app.close();
    }); 
  
    it(`it should fail if the pet doesn't have a name`, async () => {
      const pet: StorePetCommand = {
        name: '',
        birthDate: '2020-05-25',
        vaccines:[]       
      };
      const mensaje = 'The name field is required';
  
      const response = await request(app.getHttpServer())
        .post('/pets').send(pet)
        .expect(HttpStatus.BAD_REQUEST);
      expect(response.body.message).toBe(mensaje);
      expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });    
  });