import { RepositorioUsuario } from '../puerto/repositorio/repositorio-usuario';
import { Usuario } from '../modelo/usuario';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';

export class ServicioRegistrarUsuario {
  constructor(private readonly _repositorioUsuario: RepositorioUsuario) {}

  async ejecutar(usuario: Usuario) {
    if (await this._repositorioUsuario.existeEmailUsuario(usuario.email)) {
      throw new ErrorDeNegocio(`El email ${usuario.email} ya ha sido tomado`);
    }
    await this._repositorioUsuario.guardar(usuario);
  }
}
