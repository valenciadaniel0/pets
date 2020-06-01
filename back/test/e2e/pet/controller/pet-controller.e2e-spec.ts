import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { PetRepository } from 'src/dominio/pet/port/repository/pet-repository';
import { PetDao } from 'src/dominio/pet/port/dao/pet-dao';
import { PetMysqlRepository } from 'src/infraestructura/pet/adapter/repository/pet-mysql-repository';
import { PetMysqlDao } from 'src/infraestructura/pet/adapter/dao/pet-mysql-dao';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import {
  CustomSinonStubbedInstance,
  createCustomStubInstance,
} from 'test/util/create-object.stub';
import { PetController } from 'src/infraestructura/pet/controller/pet-controller';
import { StorePetService } from 'src/dominio/pet/service/store-pet-service';
import { storePetServiceProvider } from 'src/infraestructura/pet/provider/service/store-pet-service-provider';
import { StorePetHandler } from 'src/aplicacion/pet/command/store-pet.handler';
import { StorePetCommand } from 'src/aplicacion/pet/command/store-pet.command';
import { CeibaLogger } from 'src/infraestructura/configuracion/ceiba-logger.config';

describe('tests to pet controller', () => {
  let app: INestApplication;
  let petRepository: CustomSinonStubbedInstance<PetRepository>;

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
      vaccines: [],
    };
    const mensaje = 'The name field is required';
    const response = await request(app.getHttpServer())
      .post('/pets')
      .send(pet)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  /*
  it(`it should fail if the pet doesn't have a date`, async () => {
    const pet: StorePetCommand = {
      name: 'Toño',
      birthDate: '',
      vaccines: [],
    };
    const mensaje = 'The date field is required';

    const response = await request(app.getHttpServer())
      .post('/pets')
      .send(pet)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  }); */
});
