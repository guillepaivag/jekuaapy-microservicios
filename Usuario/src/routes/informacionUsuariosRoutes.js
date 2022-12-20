import { Router } from 'express'
import controllerInformacionUsuario from '../controllers/informacionUsuariosControllers.js'

const { obtener, actualizar } = controllerInformacionUsuario

const router = Router()

router.get('/:tipo/:valor/informacion', 
    obtener
)

router.put('/:uid/informacion',
    actualizar
)


export default router