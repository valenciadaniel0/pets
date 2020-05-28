import { Usuario } from 'src/dominio/usuario/modelo/usuario';
import { ErrorLongitudInvalida } from 'src/dominio/errores/error-longitud-invalida';

describe('Usuario', () => {
  const _Usuario = Usuario as any;

  it('usuario con clave menor que 4 debería retornar error', () => {
    return expect(
      async () => new _Usuario('juan', 'valenciadaniel0@gmail.com', '12'),
    ).rejects.toStrictEqual(
      new ErrorLongitudInvalida('El tamaño mínimo de la clave debe ser 4'),
    );
  });

  it('usuario con clave igual a 4 debería crear bien', () => {
    const usuario = new _Usuario('juan', 'valenciadaniel0@gmail.com', '4123');

    expect(usuario.name).toEqual('juan');
    expect(usuario.password).toEqual('4123');
  });
});
