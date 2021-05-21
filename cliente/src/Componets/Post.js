import React, { useState } from 'react';
import Avatar from './Avatar'
import BtnLike from './BtnLike';
import { Link } from 'react-router-dom';
import Comentar from './Comentar';
import { toggleLike, GuardarComentario } from '../Helpers/Post-helpers';

export default function Post({ post, actualizarPost, mostrarError, usuario }) {

    const {

        numLikes,
        numComentarios,
        comentarios,
        _id,
        caption,
        url,
        usuario : usuarioPost,
        estaLike
    } = post;

    const [trabajandoLike, setTrabajandoLike] = useState(false);

    async function onSubmit() {

        if (trabajandoLike) {
            return;
        }
        console.log(post);
        try {
            setTrabajandoLike(true);
            const postActualizado = await toggleLike(post);
            actualizarPost(post, postActualizado);
            setTrabajandoLike(false);

        } catch (error) {
            setTrabajandoLike(false);
            mostrarError('Fallo en ejecutar el like.')
            console.log(error);
        }

    }

    async function onSubmitComentario(comentario) {

        const postActualizado = await GuardarComentario(post, comentario, usuario)
        actualizarPost(post, postActualizado);
    }



    return (

        <div className="Post-Componente">
            <Avatar usuario={usuarioPost}></Avatar>
            <img src={url} alt={caption} className="Post-Componente__img"></img>
            <div className="Post-Componente__acciones">
                <div className="Post-Componente__like-container">
                    <BtnLike onSubmitLike={onSubmit} like={estaLike}></BtnLike>
                </div>
                <p>Le gusta a {numLikes} personas</p>
                <ul>
                    <li>
                        <Link to={`/perfil/${usuarioPost.username}`}>
                            <b>{usuarioPost.username}</b>

                        </Link>
                        {' '}{caption}
                    </li>
                    <VerComentarios _idPostd={_id} numComentarios={numComentarios} />
                    <Comentarios comentarios={comentarios} />
                </ul>
            </div>
            <Comentar onSubmitComentario={onSubmitComentario} />
        </div>
    );

}

function VerComentarios({ _idPost, numComentarios }) {

    if (numComentarios < 4) {

        return null;
    }

    return (

        <li className="text-grey-dark">
            <Link to={`/post/${_idPost}`}>Ver los {numComentarios} comentarios</Link>
        </li>
    );
}

function Comentarios({ comentarios }) {
    if (comentarios.length === 0) {
        return null;
    }

    return (
        comentarios.map(comentario => {
            return (
                <li key={comentario._id}>
                    <Link to={`/perfil/${comentario.usuario.username}`}>
                        <b>{comentario.usuario.username}</b>
                    </Link>
                    {' '}{comentario.mensaje}
                </li>
            );
        })
    );
}