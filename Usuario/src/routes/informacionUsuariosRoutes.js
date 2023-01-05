import { Router } from 'express'
import { obtener, actualizar } from '../controllers/informacionUsuariosControllers.js'

const router = Router()

router.get('/:tipo/:valor/informacion', 
    obtener
)

router.put('/:uid/informacion',
    actualizar
)


export default router