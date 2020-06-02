import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { VaccineRepository } from 'src/dominio/vaccine/port/repository/vaccine-repository';
import { VaccineDao } from 'src/dominio/vaccine/port/dao/vaccine-dao';
import { VaccineMysqlRepository } from 'src/infraestructura/vaccine/adapter/repository/vaccine-mysql-repository';
import { VaccineMysqlDao } from 'src/infraestructura/vaccine/adapter/dao/vaccine-mysql-dao';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import {
  createCustomStubInstance,
  CustomSinonStubbedInstance,
} from '../../../util/create-object.stub';
import { VaccineController } from 'src/infraestructura/vaccine/controller/vaccine-controller';
import { StoreVaccineService } from 'src/dominio/vaccine/service/store-vaccine-service';
import { storeVaccineServiceProvider } from 'src/infraestructura/vaccine/provider/service/store-vaccine-service-provider';
import { CeibaLogger } from 'src/infraestructura/configuracion/ceiba-logger.config';
import { StoreVaccineHandler } from 'src/aplicacion/vaccine/command/store-vaccine.handler';
import { ListVaccinesHandler } from 'src/aplicacion/vaccine/query/list-vaccines.handler';
import { ListVaccinesByPetHandler } from 'src/aplicacion/vaccine/query/list-vaccines-by-pet.handler';
import { DeleteVaccineHandler } from 'src/aplicacion/vaccine/command/delete-vaccine.handler';
import { DeleteVaccineService } from 'src/dominio/vaccine/service/delete-vaccine-service';
import { StoreVaccineCommand } from 'src/aplicacion/vaccine/command/store-vaccine.command';
import { Pet } from 'src/dominio/pet/model/pet';

describe('Vaccives controller tests', () => {
  let app: INestApplication;
  let vaccineRepository: CustomSinonStubbedInstance<VaccineRepository>;
  let vaccineDao: CustomSinonStubbedInstance<VaccineDao>;

  /**
   * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al levantar la prueba, traer una por una las dependencias)
   **/
  beforeAll(async () => {
    vaccineRepository = createCustomStubInstance(VaccineMysqlRepository);
    vaccineDao = createCustomStubInstance(VaccineMysqlDao);
    const moduleRef = await Test.createTestingModule({
      controllers: [VaccineController],
      providers: [
        CeibaLogger,
        {
          provide: StoreVaccineService,
          inject: [VaccineRepository],
          useFactory: storeVaccineServiceProvider,
        },
        { provide: VaccineRepository, useValue: vaccineRepository },
        { provide: VaccineDao, useValue: vaccineDao },
        StoreVaccineHandler,
        ListVaccinesHandler,
        ListVaccinesByPetHandler,
        DeleteVaccineHandler,
        DeleteVaccineService,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    const logger = await app.resolve(CeibaLogger);

    app.useGlobalFilters(new FiltroExcepcionesDeNegocio(logger));
    await app.init();
  });

  beforeEach(() => {
    vaccineRepository._resetStubs();
    vaccineDao._resetStubs();
  });

  afterAll(async () => {
    await app.close();
  });

  it('It should list the stored vaccines', () => {
    const vaccines: any[] = [
      { name: 'Lorem ipsum', date: new Date().toISOString(), pet: {} },
    ];
    vaccineDao.findAll.returns(Promise.resolve(vaccines));
    return request(app.getHttpServer())
      .get('/vaccines')
      .expect(HttpStatus.OK)
      .expect(vaccines);
  });

  it('It should list the stored vaccines that are related with the specified pet', () => {
    const vaccines: any[] = [
      { name: 'Lorem ipsum', date: new Date().toISOString(), pet: {} },
    ];
    vaccineDao.findByPetId.returns(Promise.resolve(vaccines));
    return request(app.getHttpServer())
      .get('/vaccines?petId=1')
      .expect(HttpStatus.OK)
      .expect(vaccines);
  });

  it('It fails to store a vaccine if the name field is empty', async () => {
    let pet = new Pet('pet name', '2020-01-25', []);
    const vaccine: StoreVaccineCommand = {
      name: '',
      date: '2020-01-25',
      pet,
    };
    const message = `The name field is required`;
    const response = await request(app.getHttpServer())
      .post('/vaccines')
      .send(vaccine)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(message);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('It fails to store a vaccine if the date field is empty', async () => {
    let pet = new Pet('pet name', '2020-01-25', []);
    const vaccine: StoreVaccineCommand = {
      name: 'Test name',
      date: '',
      pet,
    };
    const message = `The date field is required`;
    const response = await request(app.getHttpServer())
      .post('/vaccines')
      .send(vaccine)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(message);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
});
