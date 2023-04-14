import { Router } from 'express'
import { estaAutenticado } from '../middlewares/estaAutenticado.js'
import { verificarCreacionProyecto, verificarActualizacionProyecto, verificarEliminacionProyecto } from '../middlewares/proyectosMiddlewares.js'
import { crear, obtener, actualizar, restaurarFotoPerfil, restaurarFotoPortada, eliminar } from '../controllers/proyectosControllers.js'
import { estaAutenticadoUsuarioServicio } from '../middlewares/estaAutenticadoUsuarioServicio.js'

const router = Router()

router.post('/', estaAutenticado, verificarCreacionProyecto, crear)

router.get('/:uidEquipo/:tipo/:valor', obtener)

router.put('/:uidEquipo/:uid', estaAutenticadoUsuarioServicio, verificarActualizacionProyecto, actualizar)

router.put('/restaurarFotoPerfil', restaurarFotoPerfil)

router.put('/restaurarFotoPortada', restaurarFotoPortada)

router.delete('/:uidEquipo/:uid', estaAutenticado, verificarEliminacionProyecto, eliminar)

export default router