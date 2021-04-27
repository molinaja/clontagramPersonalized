import React, { useState } from 'react';
import Main from '../Componets/Main';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import Loading from '../Componets/Loading';
import Axios from 'axios';


export default function Upload() {

    const [imagenUrl, setImagenUrl] = useState('');
    const [subiendoImagen, setSubiendoImagen] = useState(false);

    return (
        <Main center={true}>
            <div className="Upload">
                <form>
                    <div className="Upload__image-section">
                        <SeccionSubirImagen imagenUrl={imagenUrl} subiendoImagen={subiendoImagen} />
                    </div>
                    <textarea name="caption" className="Upload__caption" required maxLength="180" placeholder="Caption de post">
                    </textarea>
                    <button className="Upload__submit" type="submit">
                        Post
                    </button>
                </form>
            </div>
        </Main>
    );

}

function SeccionSubirImagen({ subiendoImagen, imagenUrl }) {

    if (subiendoImagen) {
        return <Loading />;

    } else if (imagenUrl) {
        return <img src={imagenUrl} alt="" />;

    } else {
        return (
            <label className="Upload__image-label">
                <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
                <span>Publica tu foto</span>
                <input type="file" name="imagen" className="hidden"></input>
            </label>
        );

    }
}