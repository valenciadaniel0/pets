import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { DaoUsuario } from 'src/dominio/usuario/puerto/dao/dao-usuario';
import { RepositorioUsuarioMysql } from 'src/infraestructura/usuario/adaptador/repositorio/repositorio-usuario-mysql';
import { DaoUsuarioMysql } from 'src/infraestructura/usuario/adaptador/dao/dao-usuario-mysql';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import { createCustomStubInstance, CustomSinonStubbedInstance } from '../../../util/create-object.stub';
import { UsuarioControlador } from 'src/infraestructura/usuario/controlador/usuario.controlador';
import { ServicioRegistrarUsuario } from 'src/dominio/usuario/servicio/servicio-registrar-usuario';
import { servicioRegistrarUsuarioProveedor } from 'src/infraestructura/usuario/proveedor/servicio/servicio-registrar-usuario.proveedor';
import { ManejadorRegistrarUsuario } from 'src/aplicacion/usuario/comando/registar-usuario.manejador';
import { ManejadorListarUsuario } from 'src/aplicacion/usuario/consulta/listar-usuarios.manejador';
import { ComandoRegistrarUsuario } from 'src/aplicacion/usuario/comando/registrar-usuario.comando';
import { CeibaLogger } from 'src/infraestructura/configuracion/ceiba-logger.config';

describe('Pruebas al controlador de usuarios', () => {

  let app: INestApplication;
  let repositorioUsuario: CustomSinonStubbedInstance<RepositorioUsuario>;
  let daoUsuario: CustomSinonStubbedInstance<DaoUsuario>;

  /**
   * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al levantar la prueba, traer una por una las dependencias)
   **/
  beforeAll(async () => {
    repositorioUsuario = createCustomStubInstance(RepositorioUsuarioMysql);
    daoUsuario = createCustomStubInstance(DaoUsuarioMysql);
    const moduleRef = await Test.createTestingModule({
      controllers: [UsuarioControlador],
      providers: [
        CeibaLogger,
        {
          provide: ServicioRegistrarUsuario,
          inject: [RepositorioUsuario],
          useFactory: servicioRegistrarUsuarioProveedor,
        },
        { provide: RepositorioUsuario, useValue: repositorioUsuario },
        { provide: DaoUsuario, useValue: daoUsuario },
        ManejadorRegistrarUsuario,
        ManejadorListarUsuario,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    const logger = await app.resolve(CeibaLogger);

    app.useGlobalFilters(new FiltroExcepcionesDeNegocio(logger));
    await app.init();
  });

  beforeEach(() => {

    repositorioUsuario._resetStubs();
    daoUsuario._resetStubs();

  });

  afterAll(async () => {
    await app.close();
  });

  it('debería listar los usuarios registrados', () => {

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
  });
});
