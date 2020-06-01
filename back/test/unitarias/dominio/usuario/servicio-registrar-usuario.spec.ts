import { ServicioRegistrarUsuario } from 'src/dominio/usuario/servicio/servicio-registrar-usuario';
import { Usuario } from 'src/dominio/usuario/modelo/usuario';
import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';

describe('ServicioRegistrarUsuario', () => {
  let servicioRegistrarUsuario: ServicioRegistrarUsuario;
  let repositorioUsuarioStub: SinonStubbedInstance<RepositorioUsuario>;

  beforeEach(() => {
    repositorioUsuarioStub = createStubObj<RepositorioUsuario>([
      'existeEmailUsuario',
      'guardar'      
    ]);
    servicioRegistrarUsuario = new ServicioRegistrarUsuario(
      repositorioUsuarioStub,
    );
  });

  it('si el email ya existe no se puede crear y deberia retonar error', async () => {
    repositorioUsuarioStub.existeEmailUsuario.returns(Promise.resolve(true));

    await expect(
      servicioRegistrarUsuario.ejecutar(
        new Usuario('daniel', 'valenciadaniel0@gmail.com', 'davale12'),
      ),
    ).rejects.toThrow('El email valenciadaniel0@gmail.com ya ha sido tomado');
  });

  it('si el email no existe guarda el usuario el repositorio', async () => {
    repositorioUsuarioStub.existeEmailUsuario.returns(Promise.resolve(false));

    await servicioRegistrarUsuario.ejecutar(
      new Usuario('daniel', 'valenciadaniel0@gmail.com', 'davale12'),
    );

    expect(repositorioUsuarioStub.guardar.getCalls().length).toBe(1);
  });
});
