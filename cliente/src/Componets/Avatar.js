import React from 'react';
import {Link} from 'react-router-dom';
import stringToColor from 'string-to-color';

export default function Avatar({usuario}){

    return (
        <div className="Avatar">
            <ImagenAvatar usuario={usuario}></ImagenAvatar>
            <Link to={`/Perfil/${usuario.username}`}>
                <h2>{usuario.username}</h2>
            </Link>
        </div>
    );
}

export function ImagenAvatar({usuario}){
    const styles ={
        backgroundImage: usuario.imagen ? `url(${usuario.imagen})`:null,
        backgroundColor: stringToColor(usuario.username)
    }

    return (
        <div className="Avatar__img" style={styles}></div>
    );
}