import React, { useState } from 'react';
import Main from '../Componets/Main';
import {Link} from 'react-router-dom';

export default function Login({login, mostrarError}) {

    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    });

    function handleInputChange(e) {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
        //console.log(usuario);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await login(usuario.email, usuario.password);
            //const { data } = await Axios.post('/api/usuarios/login', usuario);
            //console.log(data);
        } catch (ex) {
            mostrarError(ex.response.data);
            //console.log(ex)
        }
    }

    return (
        <Main>
            <div className="FormContainer">
                <h1 className="Form__titulo">
                    Clontagram CR
                </h1>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input type="email" name="email" placeholder="E-mail" className="Form__field" required onChange={handleInputChange} value={usuario.email} />
                        <input type="password" name="password" placeholder="Contraseña" className="Form__field" required minLength="3" maxLength="30" onChange={handleInputChange} value={usuario.password} />
                        <button className="Form__submit" type="submit">Login</button>
                        <p className="FormContainer__info">
                            No tienen una cuenta? <Link to="/singup">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </Main>

    )

}