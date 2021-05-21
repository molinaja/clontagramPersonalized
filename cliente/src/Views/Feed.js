import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import Loading from '../Componets/Loading';
import Main from '../Componets/Main';
import Post from '../Componets/Post';

async function cargarPost(fechaUltimoPost) {
    const query = fechaUltimoPost ? `?fecha=${fechaUltimoPost}` : '';
    const { data: nuevosPost } = await Axios.get(`/api/posts/feed${query}`);
    return nuevosPost;
}

const PostPorLlamada = 3;

export default function FeedComponent({ mostrarError, usuario }) {

    const [posts, setPosts] = useState([]);
    const [cargandoPosts, setcargandoPosts] = useState(true);
    const [cargandoMasPosts, setcargandoMasPosts] = useState(false);
    const [todosLosPostsCargados, settodosLosPostsCargados] = useState(false);
    
    useEffect(() => {

        async function cargarPostIniciales() {
            try {
                const nuevosPost = await cargarPost('');
                setPosts(nuevosPost);
                setcargandoPosts(false);
                RevisarSiHayMasPots(nuevosPost);
                //console.log(posts);
                //console.log(nuevosPost);
            } catch (error) {
                setcargandoPosts(false);
                mostrarError('Error al cargar feed.');
                console.log(error);
            }
        }
        cargarPostIniciales();
        console.log(posts);
    }, [])

    function actualizarPost(originalPost, actualizadoPost) {

        setPosts(posts => {
            const postActualizazdos = posts.map(post => {
                if (post !== originalPost) {
                    return post
                }

                return actualizadoPost;
            });
            return postActualizazdos;
        });

    }

    async function cargarMasPosts() {

        if (cargandoMasPosts) {
            return;
        }

        try {
            setcargandoMasPosts(true);
            const ultimaFecha = posts[posts.length - 1].fecha_creado;
            const nuevosPosts = await cargarPost(ultimaFecha);

            setPosts(viejosPosts => [...posts, ...nuevosPosts]);
            setcargandoMasPosts(false);
            RevisarSiHayMasPots(nuevosPosts);

        } catch (error) {
            mostrarError('Error al cargar los posts.');
            setcargandoMasPosts(false);
        }
    }

    function RevisarSiHayMasPots(nuevosPosts) {
        if (nuevosPosts.length < PostPorLlamada) {
            settodosLosPostsCargados(true);
        }

    }

    if (cargandoPosts) {
        return (

            <Main center={true}>
                <Loading />
            </Main>

        );
    }

    if (!cargandoPosts && posts.length === 0) {
        return (
            <NoPosts></NoPosts>
        );
    }

    return (
        <Main center={true}>
            <div className="Feed">
                {
                    posts.map(post => (
                        <Post
                            key={post._id}
                            post={post}
                            usuario={usuario}
                            actualizarPost={actualizarPost}
                            mostrarError={mostrarError} />
                    ))
                }
                <CargarMasPost onClick={cargarMasPosts} todosLosPostCargados={todosLosPostsCargados}/>
            </div>

        </Main>
    );
}


function NoPosts() {

    return (
        <Main center={true}>
            <div className="NoSiguesANadie">
                <p className="NoSiguesANadie_mensaje">
                    No posts que mostrar, sigue a alguien o sube algo :).
                </p>
                <div className="text-center">
                    <Link to="/Explore" className="NoSiguesANadie__boton">Explorar</Link>
                </div>
            </div>
        </Main>


    );


}

function CargarMasPost({ onClick, todosLosPostCargados }) {
    if (todosLosPostCargados) {
        return (
            <div class="Feed__no-hay-mas-posts">No hay mas posts</div>
        );
    }

    return (
        <button className="Feed__cargar-mas" onClick={onClick}>Ver mas</button>
    );

}