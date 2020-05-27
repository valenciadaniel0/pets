import { Module } from '@nestjs/common';

import { ServicioRegistrarUsuario } from 'src/dominio/usuario/servicio/servicio-registrar-usuario';
import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { RepositorioUsuarioMysql } from './adaptador/repositorio/repositorio-usuario-mysql';
import { UsuarioEntidad } from './entidad/usuario.entidad';
import { UsuarioControlador } from './controlador/usuario.controlador';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManejadorRegistrarUsuario } from 'src/aplicacion/usuario/comando/registar-usuario.manejador';
import { DaoUsuario } from 'src/dominio/usuario/puerto/dao/dao-usuario';
import { DaoUsuarioMysql } from './adaptador/dao/dao-usuario-mysql';
import { ManejadorListarUsuario } from 'src/aplicacion/usuario/consulta/listar-usuarios.manejador';

const repositorioUsuarioProvider = {
  provide: RepositorioUsuario,
  useClass: RepositorioUsuarioMysql,
};
const daoUsuarioProvider = {
  provide: DaoUsuario,
  useClass: DaoUsuarioMysql,
};
@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntidad])],
  providers: [
    ServicioRegistrarUsuario,
    repositorioUsuarioProvider,
    daoUsuarioProvider,
    ManejadorRegistrarUsuario,
    ManejadorListarUsuario,
  ],
  controllers: [UsuarioControlador],
})
export class UsuarioModule {}
