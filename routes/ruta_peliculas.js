import express from 'express'
import service from '../services/serv_peliculas.js'
import pelicula from '../models/models_peliculas.js';
import { validarToken } from '../middleware/auth.js';
import jwt from 'jsonwebtoken'

const router = express.Router()
const llave_secreta='clave123'
//ONLY LOGIN
router.post('/login', (req,res)=>{
    console.log('body', req.body)
    const {usuario, password}=req.body

    if(usuario=='admin' && password=='12345'){
        const usuario={id:1,nombre:'Heber'};
        const token=jwt.sign(usuario,llave_secreta,{expiresIn:'1h'});
        res.json({message:'Login exitoso',token})
    }else{
        res.status(401).json({message:'Credenciales invalidas',})
    }
})

router.use(validarToken)

router.get('/',async (req,res)=>{
    const data = await service.getPeliculas();
    res.send(data)
})

router.get('/:id', async (req,res)=>{
    const {id}=req.params

    const data=await service.getPeliculasID(id);
    
    if(data){
        res.send(data)
    }else{
        res.status(404).send('No se encontro el ID')
    }
})

router.post('/',validarToken, async (req,res)=>{
    const body=req.body
    const data=await pelicula.create(body)
    res.send(data)
})



router.put('/:id',validarToken, async (req,res)=>{
        const {id} =req.params
    const body=req.body
    const data=await pelicula.update(
        body,{
            where:{
                id //BUSCA ID PARA ACTUALIZAR
            }
        })
        res.send(data)
})

router.delete('/:id', validarToken, async (req,res)=>{
        const {id}=req.params
    const data=await pelicula.destroy({
        where:{
            id, //BUSCA SI EXISTE
        }
    });
        res.send(data)
})

export default router;