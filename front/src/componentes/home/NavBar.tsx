import * as React from 'react';
import { Link } from 'react-router-dom';

export const NavBar: React.FC = () => {

  return (
      <React.Fragment>
        <Link to="/" replace={true} className="link">Home</Link>
        <span> </span>
        <Link to="/productos" className="link">Productos</Link>
      </React.Fragment>
  );

};

