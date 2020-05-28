import './App.css';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import ContenedorProductos from './componentes/productos/ContenedorProductos';
import PetsContainer from './componentes/pets/PetsContainer';
import Home from './componentes/home/Home';


function App() {
  return (
      <React.Fragment>        
        <hr/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/productos" component={ContenedorProductos}/>
          <Route path="/pets" component={PetsContainer}/>
        </Switch>
      </React.Fragment>
  );
}

export default App;
