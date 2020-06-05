import './App.css';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import ContenedorProductos from './componentes/productos/ContenedorProductos';
import PetsContainer from './componentes/pets/PetsContainer';


function App() {
  return (
      <React.Fragment>        
        <hr/>
        <Switch>          
          <Route path="/" component={PetsContainer}/>
          <Route path="/productos" component={ContenedorProductos}/>          
        </Switch>
      </React.Fragment>
  );
}

export default App;
