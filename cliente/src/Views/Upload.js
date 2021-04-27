import React, { useState } from 'react';
import Main from '../Componets/Main';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import Loading from '../Componets/Loading';
import Axios from 'axios';


export default function Upload({history, mostrarError}) {

    const [imagenUrl, setImagenUrl] = useState('');
    const [subiendoImagen, setSubiendoImagen] = useState(false);
    const [envienadoPost, setEnvienadoPost] = useState(false);
    const [caption, setCaption] = useState('');

    async function handleImagenSeleccionada(event){

        try {
            setSubiendoImagen(true);
            const file = event.target.files[0];
            const config = {
                headers:{
                    'Content-Type': file.type
                }
            };
            const {data} = await Axios.post('/api/posts/upload', file, config);
            //console.log(data);
            setImagenUrl(data.url);
            setSubiendoImagen(false);

        } catch (error) {
            setSubiendoImagen(false);
            mostrarError(error.response.data);
            console.log(error.response.data);

        }

    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (envienadoPost) {
            return;
        }

        if (subiendoImagen) {
            mostrarError('Se esta subiendo una imagen');
            return;
        }

        if (!imagenUrl) {
            mostrarError('Primero selecciona una imagen');
            return;
        }

        try {
            setEnvienadoPost(true);
            const body = {
                caption, 
                url: imagenUrl
            };
            await Axios.post('/api/posts', body)
            setEnvienadoPost(false);
            history.push('/');

        } catch (error) {
            mostrarError(error.response.data);
        }
        
    }

    return (
        <Main center={true}>
            <div className="Upload">
                <form onSubmit={handleSubmit}>
                    <div className="Upload__image-section">
                        <SeccionSubirImagen imagenUrl={imagenUrl} subiendoImagen={subiendoImagen} handleImagenSeleccionada={handleImagenSeleccionada} />
                    </div>
                    <textarea name="caption" className="Upload__caption" required maxLength="180" placeholder="Caption de post" value={caption} onChange={e => setCaption(e.target.value)}>
                    </textarea>
                    <button className="Upload__submit" type="submit">
                        Post
                    </button>
                </form>
            </div>
        </Main>
    );

}

function SeccionSubirImagen({ subiendoImagen, imagenUrl, handleImagenSeleccionada}) {

    if (subiendoImagen) {
        return <Loading />;

    } else if (imagenUrl) {
        return <img src={imagenUrl} alt="" />;

    } else {
        return (
            <label className="Upload__image-label">
                <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
                <span>Publica tu foto</span>
                <input type="file" name="imagen" className="hidden" onChange={handleImagenSeleccionada}></input>
            </label>
        );

    }
}