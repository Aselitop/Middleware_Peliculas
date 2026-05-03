import pelicula from '../models/models_peliculas.js'
import jwt from 'jsonwebtoken'

async function getPeliculas(){
    const data = await pelicula.findAll()
    return data
}

async function getPeliculasID(id){
    const data= await pelicula.findByPk(id)
    return data
}

const getAutorizacion = (req, res, next) => {

    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ mensaje: 'Acceso denegado. No se proporcionó un token.' });
    }
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ mensaje: 'Formato de token inválido.' });
    }

    try {
        const decoded = jwt.verify(token, 'TU_LLAVE_SECRETA');
        
        req.user = decoded;

        next();
    } catch (error) {
        res.status(403).json({ mensaje: 'Token inválido o expirado.' });
    }
};
export default { getPeliculas, getPeliculasID, getAutorizacion }