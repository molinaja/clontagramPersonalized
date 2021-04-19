import React, { useState } from 'react';
import Axios from 'axios';
import Main from '../Componets/Main';


export default function Login() {

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
            const { data } = await Axios.post('/api/usuarios/login', usuario);
            console.log(data);
        } catch (ex) {
            console.log(ex)
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
                            No tienen una cuenta? <a href="/singup">Login</a>
                        </p>
                    </form>
                </div>
            </div>
        </Main>

    )

}