import { Router } from 'express'
import { estaAutenticado } from '../middlewares/estaAutenticado.js'
import {  } from '../middlewares/proyectosMiddlewares.js'
import { crear, obtener, actualizar, restaurarFotoPerfil, restaurarFotoPortada, eliminar } from '../controllers/proyectosControllers.js'

const router = Router()

router.post('/', crear)

router.get('/:tipo/:valor', obtener)

router.put('/:uid', actualizar)

router.put('/restaurarFotoPerfil', restaurarFotoPerfil)

router.put('/restaurarFotoPortada', restaurarFotoPortada)

router.delete('/:uid', eliminar)

export default router