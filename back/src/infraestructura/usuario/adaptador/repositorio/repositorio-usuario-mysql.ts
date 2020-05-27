import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { Usuario } from 'src/dominio/usuario/modelo/usuario';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntidad } from '../../entidad/usuario.entidad';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RepositorioUsuarioMysql implements RepositorioUsuario {
  constructor(
    @InjectRepository(UsuarioEntidad)
    private readonly repositorio: Repository<UsuarioEntidad>,
  ) {}

  async existeEmailUsuario(email: string): Promise<boolean> {
    return (await this.repositorio.count({ email: email })) > 0;
  }

  async guardar(usuario: Usuario) {
    const entidad = new UsuarioEntidad();
    entidad.password = usuario.password;
    entidad.email = usuario.email;    
    entidad.name = usuario.name;
    await this.repositorio.save(entidad);
  }
}
