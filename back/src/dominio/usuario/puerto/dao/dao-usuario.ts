import { UsuarioDTO } from '../../modelo/usuario.dto';

export abstract class DaoUsuario {
  abstract async listar(): Promise<UsuarioDTO[]>;
}
