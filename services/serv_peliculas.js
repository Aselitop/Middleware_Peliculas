import pelicula from '../models/models_peliculas.js'

async function getPeliculas(){
    const data = await pelicula.findAll()
    return data
}

export default { getPeliculas }