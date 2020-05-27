import './App.css';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import ContenedorProductos from './componentes/productos/ContenedorProductos';
import Header from './componentes/home/Header';
import Home from './componentes/home/Home';


function App() {
  return (
      <React.Fragment>
        <Header/>
        <hr/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/productos" component={ContenedorProductos}/>
        </Switch>
      </React.Fragment>
  );
}

export default App;
