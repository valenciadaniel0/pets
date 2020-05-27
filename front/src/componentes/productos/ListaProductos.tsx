import * as PropTypes from 'prop-types';
import * as React from 'react';
import { EliminarProducto } from './EliminarProducto';
import { Producto } from './modelo/Producto';

export interface ListaProductosProps {
  productos: Array<Producto>,
  onClickEliminarProducto: (productos: Producto) => void
}

export const ListaProductos: React.FC<ListaProductosProps> = (props) => {

  const {productos, onClickEliminarProducto} = props;

  return (
      <table>
        <thead>
        <tr>
          <td>
            <b>Título</b>
          </td>
          <td>
            <b>Fecha creación</b>
          </td>
          <td>
            <b>Eliminar</b>
          </td>
        </tr>
        </thead>
        <tbody>
        {productos.map((producto: Producto) => {
          return (
              <tr key={producto.slug}>
                <td>
                  {producto.title}
                </td>
                <td>
                  {producto.createdAt + ''}
                </td>
                <td>
                  <EliminarProducto producto={producto}
                                    onClickEliminarProducto={onClickEliminarProducto}></EliminarProducto>
                </td>
              </tr>
          );
        })}
        </tbody>
      </table>

  );

};

ListaProductos.propTypes = {
  productos: PropTypes.array.isRequired,
  onClickEliminarProducto: PropTypes.func.isRequired,
};
