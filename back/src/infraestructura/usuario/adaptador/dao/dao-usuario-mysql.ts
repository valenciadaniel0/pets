import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { DaoUsuario } from 'src/dominio/usuario/puerto/dao/dao-usuario';
import { UsuarioDTO } from 'src/dominio/usuario/modelo/usuario.dto';

export class DaoUsuarioMysql implements DaoUsuario {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async listar(): Promise<UsuarioDTO[]> {
    return await this.entityManager.query(
      'SELECT u.nombre, u.clave FROM USUARIO u',
    );
  }
}
