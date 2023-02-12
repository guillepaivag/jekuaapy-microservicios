import { Router } from 'express'
import { estaAutenticadoUsuarioServicio } from '../middlewares/estaAutenticadoUsuarioServicio.js'
import { estaAutenticadoOpcional } from '../middlewares/estaAutenticadoOpcional.js'

const router = Router()

// MIEMBRO_INTERNO-TODO: Solicitar a un usuario que sea miembro de un equipo
router.post('/', estaAutenticadoUsuarioServicio, verificarSolicitudDeMiembroInterno, solicitar)

// MIEMBRO_INTERNO-TODO: Obtener miembro
router.get('/:tipo/:valor', estaAutenticadoUsuarioServicio, verificarObtencionMiembroInterno, obtener)

// MIEMBRO_INTERNO-TODO: Actualizar miembro del equipo [rol | estado]
router.put('/:uid', estaAutenticadoUsuarioServicio, verificarActualizacionMiembroInterno, actualizar)

// MIEMBRO_INTERNO-TODO: Eliminar miembro del equipo
router.delete('/:uid', estaAutenticadoUsuarioServicio, verificarEliminacionMiembroInterno, eliminar)

export default router