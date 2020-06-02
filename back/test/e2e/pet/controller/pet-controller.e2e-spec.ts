import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { PetRepository } from 'src/dominio/pet/port/repository/pet-repository';
import { PetDao } from 'src/dominio/pet/port/dao/pet-dao';
import { PetMysqlRepository } from 'src/infraestructura/pet/adapter/repository/pet-mysql-repository';
import { PetMysqlDao } from 'src/infraestructura/pet/adapter/dao/pet-mysql-dao';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import {
  createCustomStubInstance,
  CustomSinonStubbedInstance,
} from '../../../util/create-object.stub';
import { PetController } from 'src/infraestructura/pet/controller/pet-controller';
import { StorePetService } from 'src/dominio/pet/service/store-pet-service';
import { storePetServiceProvider } from 'src/infraestructura/pet/provider/service/store-pet-service.provider';
import { StorePetHandler } from 'src/aplicacion/pet/command/store-pet.handler';
import { ListPetsHandler } from 'src/aplicacion/pet/query/list-pets.handler';
import { StorePetCommand } from 'src/aplicacion/pet/command/store-pet.command';
import { CeibaLogger } from 'src/infraestructura/configuracion/ceiba-logger.config';
import { DeletePetHandler } from 'src/aplicacion/pet/command/delete-pet.handler';
import { DeletePetService } from 'src/dominio/pet/service/delete-pet-service';
import { FindPetHandler } from 'src/aplicacion/pet/query/find-pet.handler';
import { UpdatePetHandler } from 'src/aplicacion/pet/command/update-pet.handler';
import { UpdatePetService } from 'src/dominio/pet/service/update-pet-service';

describe('Pet controller tests', () => {
  let app: INestApplication;
  let petRepository: CustomSinonStubbedInstance<PetRepository>;
  let petDao: CustomSinonStubbedInstance<PetDao>;

  /**
   * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al levantar la prueba, traer una por una las dependencias)
   **/
  beforeAll(async () => {
    petRepository = createCustomStubInstance(PetMysqlRepository);
    petDao = createCustomStubInstance(PetMysqlDao);
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
        { provide: PetDao, useValue: petDao },
        StorePetHandler,
        ListPetsHandler,
        DeletePetHandler,
        DeletePetService,
        FindPetHandler,
        UpdatePetHandler,
        UpdatePetService,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    const logger = await app.resolve(CeibaLogger);

    app.useGlobalFilters(new FiltroExcepcionesDeNegocio(logger));
    await app.init();
  });

  beforeEach(() => {
    petRepository._resetStubs();
    petDao._resetStubs();
  });

  afterAll(async () => {
    await app.close();
  });

  it('It should list the stored pets', () => {
    const pets: any[] = [
      {
        id: 1,
        nombre: 'Lorem ipsum',
        birthDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      },
    ];
    petDao.findAll.returns(Promise.resolve(pets));
    return request(app.getHttpServer())
      .get('/pets')
      .expect(HttpStatus.OK)
      .expect(pets);
  });

  it('It should find the specified pet', () => {
    const pet: any = {
      id: 1,
      nombre: 'Lorem ipsum',
      birthDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    petDao.find.returns(Promise.resolve(pet));
    return request(app.getHttpServer())
      .get('/pets/1')
      .expect(HttpStatus.OK)
      .expect(pet);
  });

  it('It should fail to store a pet without name', async () => {
    const pet: StorePetCommand = {
      name: '',
      birthDate: '2020-01-25',
      vaccines: [],
    };
    const message = 'The name field is required';

    const response = await request(app.getHttpServer())
      .post('/pets')
      .send(pet)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(message);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('It should successfully store a pet with all the fields', async () => {
    const pet: StorePetCommand = {
      name: 'Test name',
      birthDate: '2020-01-25',
      vaccines: [],
    };

    await request(app.getHttpServer())
      .post('/pets')
      .send(pet)
      .expect(HttpStatus.CREATED);    
  });

  it('It should fail to update a pet sending a body without name', async () => {
    const pet: StorePetCommand = {
      name: '',
      birthDate: '2020-01-25',
      vaccines: [],
    };
    const message = 'The name field is required';

    const response = await request(app.getHttpServer())
      .put('/pets/1')
      .send(pet)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(message);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
});
