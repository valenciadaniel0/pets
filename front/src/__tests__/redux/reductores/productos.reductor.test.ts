import { EstadoProducto } from '../../../redux/modelo/EstadoProducto';
import { Producto } from '../../../componentes/productos/modelo/Producto';
import { agregarNuevoProducto } from '../../../redux/acciones/productos/productos.acciones';
import reductorProductos from '../../../redux/reductores/productos.reductor';

describe('Reductor productos', () => {

  it('debería agregar productos', () => {

    // Arrange
    const estadoInicial: EstadoProducto = {
      cantidadTotalProducto: 2,
      productos: []
    };
    const nuevoProducto: Producto = {
      title: 'nuevo',
      slug: 'Juan Pablo Botero',
      body: 'posting the article accessing using constant',
      createdAt: new Date('2020-03-03T03:20:27.795Z'),
      updatedAt: new Date('2020-03-03T03:20:27.795Z')
    };
    const estadoEsperado: EstadoProducto = {...estadoInicial, productos: [nuevoProducto]};

    // Act
    const nuevoEstado = reductorProductos(estadoInicial, agregarNuevoProducto(nuevoProducto));

    // Assert
    expect(nuevoEstado).toStrictEqual(estadoEsperado);

  });
});
