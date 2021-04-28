import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Nav from './Componets/Nav';
import Loading from './Componets/Loading';
import Main from './Componets/Main';
import Error from './Componets/Error';


import { deleteToken, setToken, getToken, initAxiosInterceptor } from './Helpers/auth-helpers';

import Singup from './Views/Singup';
import Login from './Views/Login';
import Upload from './Views/Upload';
import Feed from './Views/Feed';

initAxiosInterceptor();

export default function App() {

  const [usuario, setUsuario] = useState(null);
  const [cargandoUsuario, setCargandoUsuario] = useState(true);
  const [error, setError] = useState(null);

  useEffect(
    () => {

      async function cargarUsuario() {
        if (!getToken()) {
          setCargandoUsuario(false);
          return;
        }

        try {

          const { data: usuario } = await Axios.get('/api/usuarios/whoami');
          setUsuario(usuario);
          setCargandoUsuario(false);

        } catch (ex) {

          console.log(ex);
        }
      }

      cargarUsuario();
    }, []);

  async function login(email, password) {

    const { data } = await Axios.post('/api/usuarios/login', { email, password });
    setUsuario(data.usuario)
    setToken(data.token);

  }

  async function signup(usuario) {

    const { data } = await Axios.post('/api/usuarios/signup', usuario);
    setUsuario(data.usuario)
    setToken(data.token);

  }

  function logout() {

    setUsuario(null);
    deleteToken();

  }

  function mostrarError(mensaje) {
    console.log(mensaje);
    setError(mensaje);
  }

  function quitarError() {

    setError(null);
  }

  if (cargandoUsuario) {
    return (

      <Main center={true}>
        <Loading />
      </Main>

    );
  }

  return (
    <Router>
      <Nav usuario={usuario}/>
      <Error mensaje={error} esconderError={quitarError} />
      {
        usuario
          ? (<LoginRoutes mostrarError={mostrarError} />)
          : (<LogoutRoutes login={login} signup={signup} mostrarError={mostrarError} />)
      }
    </Router>
  );
}

function LoginRoutes({ mostrarError }) {

  return (

    <Switch>

      <Route
        path="/upload"
        render={
          props => <Upload {...props} mostrarError={mostrarError} />
        }
      />

      <Route
        path="/"
        render={
          props => <Feed {...props} mostrarError={mostrarError} />
        }
        default
      />

    </Switch>

  );

}

function LogoutRoutes({ signup, login, mostrarError }) {

  return (
    <Switch>
      <Route
        path="/login"
        render={
          props => <Login {...props} login={login} mostrarError={mostrarError} />
        }
      />
      <Route
        render={
          props => <Singup {...props} signup={signup} mostrarError={mostrarError} />
        }
        default
      />
    </Switch>
  );

}