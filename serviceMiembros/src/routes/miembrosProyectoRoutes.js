import { Router } from 'express'
import { estaAutenticadoUsuario } from '../middlewares/estaAutenticadoUsuario.js'
import { verificarCreacionDeMiembroProyecto, verificarEliminacionMiembroProyecto } from '../middlewares/miembrosProyectoMiddlewares.js'
import { crear, obtener, eliminar } from '../controllers/miembrosProyectoControllers.js'

const router = Router()

// Crear MiembroProyecto
router.post('/', estaAutenticadoUsuario, verificarCreacionDeMiembroProyecto, crear)

// Obtener miembro proyecto
router.get('/:uidEquipo/:uidProyecto/:uidMiembro', obtener)

// Eliminar miembro del proyecto
router.delete('/:uidEquipo/:uidProyecto/:uidMiembro', estaAutenticadoUsuario, verificarEliminacionMiembroProyecto, eliminar)

export default router