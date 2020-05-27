import { Usuario } from 'src/dominio/usuario/modelo/usuario';

describe('Usuario', () => {
  it('usuario con clave menor que 4 deberia retornar error', () => {
    expect(() => new Usuario('juan', '12', new Date())).toThrow(
      'El tamaño mínimo de la clave debe ser 4',
    );
  });

  it('usuario con clave igual a 4 debería crear bien', () => {
    const usuario = new Usuario('juan', '4123', new Date());

    expect(usuario.nombre).toEqual('juan');
    expect(usuario.clave).toEqual('4123');
  });
});
