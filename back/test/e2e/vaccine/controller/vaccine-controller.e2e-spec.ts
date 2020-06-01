import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { VaccineRepository } from 'src/dominio/vaccine/port/repository/vaccine-repository';
import { VaccineDao } from 'src/dominio/vaccine/port/dao/vaccine-dao';
import { VaccineMysqlRepository } from 'src/infraestructura/vaccine/adapter/repository/vaccine-mysql-repository';
import { VaccineMysqlDao } from 'src/infraestructura/vaccine/adapter/dao/vaccine-mysql-dao';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import {
  CustomSinonStubbedInstance,
  createCustomStubInstance,
} from 'test/util/create-object.stub';
import { VaccineController } from 'src/infraestructura/vaccine/controller/vaccine-controller';
import { StoreVaccineService } from 'src/dominio/vaccine/service/store-vaccine-service';
import { storeVaccineServiceProvider } from 'src/infraestructura/vaccine/provider/service/store-vaccine-service-provider';
import { StoreVaccineHandler } from 'src/aplicacion/vaccine/command/store-vaccine.handler';
import { StoreVaccineCommand } from 'src/aplicacion/vaccine/command/store-vaccine.command';
import { CeibaLogger } from 'src/infraestructura/configuracion/ceiba-logger.config';


describe('Tests to vaccine controller', () => {

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

  /* it('debería listar los usuarios registrados', () => {

    const usuarios: any[] = [{ nombre: 'Lorem ipsum', fechaCreacion: (new Date().toISOString()) }];
    daoUsuario.listar.returns(Promise.resolve(usuarios));    
    return request(app.getHttpServer())
      .get('/usuarios')
      .expect(HttpStatus.OK)
      .expect(usuarios);
  });

  it('debería fallar al registar un usuario clave muy corta', async () => {
    const usuario: ComandoRegistrarUsuario = {
      name: 'Lorem ipsum',
      email: 'valenciadaniel0@gmail.com',
      password: '123',
    };
    const mensaje = 'El tamaño mínimo de la clave debe ser 4';

    const response = await request(app.getHttpServer())
      .post('/usuarios').send(usuario)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('debería fallar al registar un usuario cuyo email ya existe', async () => {
    const usuario: ComandoRegistrarUsuario = {
      name: 'Lorem ipsum',
      email: 'valenciadaniel0@gmail.com',
      password: '1234',
    };
    const mensaje = `El email ${usuario.email} ya ha sido tomado`;
    repositorioUsuario.existeEmailUsuario.returns(Promise.resolve(true));

    const response = await request(app.getHttpServer())
      .post('/usuarios').send(usuario)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  }); */
});
