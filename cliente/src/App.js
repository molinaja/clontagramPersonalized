import React from 'react';
import Nav from './Componets/Nav';
import Singup from './Views/Singup';
import Login from './Views/Login';
export default function App() {
  return (
    <div className="ContenedorTemporal">
      <Nav />
      {/*<Singup />*/}
      <Login />
    </div>);
}
