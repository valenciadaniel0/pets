import { Controller, Post, Body, Get } from '@nestjs/common';
import { ComandoRegistrarUsuario } from 'src/aplicacion/usuario/comando/registrar-usuario.comando';
import { ManejadorRegistrarUsuario } from 'src/aplicacion/usuario/comando/registar-usuario.manejador';
import { ManejadorListarUsuario } from 'src/aplicacion/usuario/consulta/listar-usuarios.manejador';
import { UsuarioDTO } from 'src/dominio/usuario/modelo/usuario.dto';

@Controller('usuarios')
export class UsuarioControlador {
  constructor(
    private readonly _manejadorRegistrarUsuario: ManejadorRegistrarUsuario,
    private readonly _manejadorListarUsuario: ManejadorListarUsuario,
  ) {}

  @Post()
  async crear(@Body() comandoRegistrarUsuario: ComandoRegistrarUsuario) {
    await this._manejadorRegistrarUsuario.ejecutar(comandoRegistrarUsuario);
  }

  @Get()
  async listar(): Promise<UsuarioDTO[]> {
    return await this._manejadorListarUsuario.ejecutar();
  }
}
