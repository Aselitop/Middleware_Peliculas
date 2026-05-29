import express from 'express'
import fs from 'fs'
import path from 'path'
import rutaPeliculas from './routes/ruta_peliculas.js'
import jwt from 'jsonwebtoken' 

const port=3000

const app=express()

app.use(express.json())

const llave_secreta='clave123'

const logger = (req, res, next) => {
    const log=(`${new Date().toLocaleString()} - ${req.method} en ${req.url}\n`);
    const ruta=path.join(import.meta.dirname,'log.txt')
    fs.writeFileSync(ruta,log,{flag:'a'})
    next(); // ¡Crucial para que la petición no se quede colgada!
};


//const validarToken = (req, res, next) => {
//    const apiKey = req.query.key;
//        if (apiKey === '12345') {
//            next();
//        } else {
//            res.status(403).send('Acceso Prohibido: API Key inválida');
//        }
//};

app.use(logger);
app.use('/peliculas',rutaPeliculas)

app.listen(port,()=>{
    console.log('Servidor iniciado en puerto :',port)
})