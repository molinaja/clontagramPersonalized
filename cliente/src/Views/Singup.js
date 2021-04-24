import React, { useState } from 'react';
import Main from '../Componets/Main';
import imageSignup from "../imagenes/signup.png";
import {Link} from 'react-router-dom';

export default function Singup({signup, mostrarError}) {

    const [usuario, setUsuario] = useState({
        email: '',
        username: '',
        password: '',
        nombre: '',
        bio: ''
    });

    function handleInputChange(e) {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await signup(usuario);
        } catch (ex) {
            mostrarError(ex.response.data);
            console.log(ex)
        }
    }

    return (
        <Main center={true}>
            <div className="Signup">
                <img src={imageSignup} alt="" className="Signup__img" />
                <div className="FormContainer">
                    <h1 className="Form__titulo">Clontagram CR</h1>
                    <p className="FormContainer__info">
                        Registrate para iniciar
                    </p>
                    <form onSubmit={handleSubmit}>
                        <input type="email" name="email" placeholder="E-mail" className="Form__field" required onChange={handleInputChange} value={usuario.email} />
                        <input type="text" name="nombre" placeholder="Nombre" className="Form__field" required minLength="3" maxLength="100" onChange={handleInputChange} value={usuario.nombre} />
                        <input type="text" name="username" placeholder="User Name" className="Form__field" required minLength="3" maxLength="30" onChange={handleInputChange} value={usuario.username} />
                        <input type="text" name="bio" placeholder="Cuentanos de ti" className="Form__field" required maxLength="150" onChange={handleInputChange} value={usuario.bio} />
                        <input type="password" name="password" placeholder="Contraseña" className="Form__field" required minLength="3" maxLength="30" onChange={handleInputChange} value={usuario.password} />
                        <button className="Form__submit" type="submit">Sign up</button>
                        <p className="FormContainer__info">
                            Ya tienen una cuenta? <Link to="/login">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </Main>
    );

}