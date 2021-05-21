import React, { useState } from 'react';

export default function Comentar({ onSubmitComentario, mostrarError }) {

    const [mensaje, setMensaje] = useState('');
    const [enviandoComentario, setEnviandoComentario] = useState(false);


    async function onSubmit(e) {
        e.preventDefault();

        if (enviandoComentario) {
            return;
        }

        try {
            setEnviandoComentario(true);
            await onSubmitComentario(mensaje);
            setEnviandoComentario(false);
            setMensaje('');
        } catch (error) {
            setEnviandoComentario(false);
            mostrarError('Error al guardar el comentario');
        }
    }

    return (
        <form className="Post__comentario-form-container" onSubmit={onSubmit} >
            <input type="text" placeholder="Deja un comentario ..." required maxLength="180" onChange={e => setMensaje(e.target.value)} value={mensaje} ></input>
            <button type="submit">Enviar</button>
        </form >
    );

}