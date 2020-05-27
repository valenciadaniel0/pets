import * as React from 'react';
import { ReactWrapper, mount } from 'enzyme';
import { PaginadorProductos } from '../../../componentes/productos/PaginadorProductos';

describe('PaginadorProductos Test', () => {

  let componentWrapper: ReactWrapper;

  afterEach(() => {
    componentWrapper.unmount();
  });

  it('Renderizar con menos de 10 productos no debe pintar botones', () => {
    componentWrapper = mount(<PaginadorProductos cantidadTotalProductos={9}
                                                 onClickCambiarPagina={() => {
                                                 }}/>);

    expect(componentWrapper.text()).toBe('');
  });

  it('Renderizar con  20 productos debe pintar 2 botones', () => {
    componentWrapper = mount(<PaginadorProductos cantidadTotalProductos={20}
                                                 onClickCambiarPagina={() => {
                                                 }}/>);
    expect(componentWrapper.find('[data-testid="boton-paginar0"]').text()).toBe('1');
    expect(componentWrapper.find('[data-testid="boton-paginar1"]').text()).toBe('2');
    expect(componentWrapper.find('[data-testid="boton-paginar2"]').exists()).toBeFalsy();

  });

});

export {};
