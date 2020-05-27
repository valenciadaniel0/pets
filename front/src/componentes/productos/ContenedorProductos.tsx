import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  agregarNuevoProducto,
  eliminarProducto,
  listarProductosAsync
} from '../../redux/acciones/productos/productos.acciones';
import { AgregarProducto } from './AgregarProducto';
import { EstadoGeneral } from '../../redux/modelo/EstadoGeneral';
import { ListaProductos } from './ListaProductos';
import { PaginadorProductos } from './PaginadorProductos';
import { Producto } from './modelo/Producto';
import { connect } from 'react-redux';


interface Props {
  productos: Array<Producto>,
  listarProductos: (numeroPagina: number) => void
  agregarNuevoProducto: (productos: Producto) => void,
  eliminarProducto: (productos: Producto) => void,
  cantidadTotalProducto: number
}

class ContenedorProductos extends React.Component<Props, any> {

  static propTypes = {
    productos: PropTypes.array.isRequired,
    listarProductos: PropTypes.func.isRequired,
    agregarNuevoProducto: PropTypes.func.isRequired,
    eliminarProducto: PropTypes.func.isRequired,
    cantidadTotalProducto: PropTypes.number.isRequired,
  }

  componentDidMount() {
    this.props.listarProductos(1);
  }

  render() {

    const {productos, cantidadTotalProducto, listarProductos} = this.props;

    return (
        <React.Fragment>
          <ListaProductos productos={productos}
                          onClickEliminarProducto={this.props.eliminarProducto}/>
          <AgregarProducto onClickAgregarProducto={this.props.agregarNuevoProducto}/>
          <PaginadorProductos cantidadTotalProductos={cantidadTotalProducto}
                              onClickCambiarPagina={listarProductos}/>
        </React.Fragment>
    );
  }
}

const mapStateToProps = (state: EstadoGeneral) => {
  return state.productos;
};

export default connect(
    mapStateToProps,
    {
      listarProductos: listarProductosAsync,
      agregarNuevoProducto: agregarNuevoProducto,
      eliminarProducto: eliminarProducto
    }
)(ContenedorProductos);
