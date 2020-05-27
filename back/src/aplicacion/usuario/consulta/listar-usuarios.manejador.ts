import { Injectable } from '@nestjs/common';

import { DaoUsuario } from 'src/dominio/usuario/puerto/dao/dao-usuario';
import { UsuarioDTO } from 'src/dominio/usuario/modelo/usuario.dto';

@Injectable()
export class ManejadorListarUsuario {
  constructor(private _daoUsuario: DaoUsuario) {}

  async ejecutar(): Promise<UsuarioDTO[]> {
    return await this._daoUsuario.listar();
  }
}
