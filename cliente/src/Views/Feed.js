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

export default function FeedComponent({ mostrarError }) {

    const [posts, setPosts] = useState([]);
    const [cargandoPosts, setcargandoPosts] = useState(true);

    useEffect(() => {

        async function cargarPostIniciales() {
            try {
                const nuevosPost = await cargarPost('');
                setPosts(nuevosPost);
                setcargandoPosts(false);
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
                        <Post key={post._id} post={post}></Post>
                    ))
                }
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