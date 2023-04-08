import { Router } from 'express'
import { estaAutenticadoUsuario } from '../middlewares/estaAutenticadoUsuario.js'
import { estaAutenticadoUsuarioServicio } from '../middlewares/estaAutenticadoUsuarioServicio.js'
import { verificarCreacionDeMiembroEquipo, verificarActualizacionMiembroEquipo, verificarEliminacionMiembroEquipo } from '../middlewares/miembrosEquipoMiddlewares.js'
import { actualizar, crear, obtener } from '../controllers/miembrosEquipoControllers.js'

const router = Router()

// Crear MiembroEquipo
router.post('/', estaAutenticadoUsuarioServicio, verificarCreacionDeMiembroEquipo, crear)

// Obtener miembro
router.get('/:uidEquipo/:uidMiembro', obtener)

// Actualizar miembro del equipo [roles | estado]
router.put('/:uidEquipo/:uidMiembro', estaAutenticadoUsuario, verificarActualizacionMiembroEquipo, actualizar)

// MIEMBRO_EQUIPO-TODO: Eliminar miembro del equipo
router.delete('/:uidEquipo/:uidMiembro', estaAutenticadoUsuario, verificarEliminacionMiembroEquipo, eliminar)

export default router