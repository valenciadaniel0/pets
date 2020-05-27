import { ServicioRegistrarUsuario } from 'src/dominio/usuario/servicio/servicio-registrar-usuario';
import { Usuario } from 'src/dominio/usuario/modelo/usuario';

describe('ServicioRegistrarUsuario', () => {
  it('si el nombre de usuario ya existe no se puede crear y deberia retonar error', async () => {
    const servicioRegistrarUsuario = new ServicioRegistrarUsuario({
      existeNombreUsuario: jest.fn(async nombre => nombre == 'juan'),
      guardar: jest.fn(async () => ({})),
    });

    await expect(
      servicioRegistrarUsuario.ejecutar(
        new Usuario('juan', '1234', new Date()),
      ),
    ).rejects.toThrow('El nombre de usuario juan ya existe');
  });

  it('si el nombre no existe guarda el usuario el repositorio', async () => {
    const mockExisteNombreUsuario = jest.fn(async () => false);
    const mockGuardar = jest.fn(async () => ({}));
    const servicioRegistrarUsuario = new ServicioRegistrarUsuario({
      existeNombreUsuario: mockExisteNombreUsuario,
      guardar: mockGuardar,
    });

    await servicioRegistrarUsuario.ejecutar(
      new Usuario('juan', '1234', new Date()),
    );

    expect(mockGuardar.mock.calls.length).toBe(1);
  });
});
