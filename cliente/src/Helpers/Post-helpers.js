import Axios from 'axios';

export async function toggleLike(post) {


    const url = `/api/posts/${post.id}/likes`;
    let PostActualizado;
    if (post.estaLike) {
        await Axios.delete(url, {});
        PostActualizado = {
            ...post, estaLike: false, numLikes: post.numLikes - 1

        }
    } else {
        await Axios.post(url, {});
        PostActualizado = {
            ...post, estaLike: true, numLikes: post.numLikes + 1

        }
    }

    return PostActualizado;
}

export async function GuardarComentario(post, mensaje, usuario) {

    const { data: nuevoComment } = await Axios.post(
        `/api/posts/${post._id}/comentarios`,
        { mensaje }
    );

    nuevoComment.usuario = usuario

    const postConCOmentarioActualizado = {
        ...post,
        comentarios: [...post.comentarios, nuevoComment
        ],
        numComentarios: post.numComentarios + 1
    };

    return postConCOmentarioActualizado;

}
