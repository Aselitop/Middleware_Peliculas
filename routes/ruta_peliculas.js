import express from 'express'
import service from '../services/serv_peliculas.js'
import pelicula from '../models/models_peliculas.js';

const router = express.Router()

router.get('/',async (req,res)=>{
    const data = await service.getPeliculas();
    res.send(data)
})

router.get('/:id', async (req,res)=>{
    const {id}=req.params
    const data=await service.getPeliculas(id);
    if(data){
        res.send(data)
    }else{
        res.status(404).send('No se encontro el ID')
    }
})

router.post('/', async (req,res)=>{
    const body=req.body
    const data=await pelicula.create(body)
    res.send(data)
})

router.put('/:id', async (req,res)=>{
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

router.delete('/:id', async (req,res)=>{
        const {id}=req.params
    const data=await pelicula.destroy({
        where:{
            id, //BUSCA SI EXISTE
        }
    });
        res.send(data)
})

export default router;