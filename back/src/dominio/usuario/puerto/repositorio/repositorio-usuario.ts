import { Usuario } from '../../modelo/usuario';

export abstract class RepositorioUsuario {
  abstract async existeEmailUsuario(email: string): Promise<boolean>;
  abstract async guardar(usuario: Usuario);
}
