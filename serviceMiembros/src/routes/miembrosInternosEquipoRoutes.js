import { Router } from 'express'
import { estaAutenticadoServicio } from '../middlewares/estaAutenticadoServicio.js'
import { estaAutenticadoUsuarioServicio } from '../middlewares/estaAutenticadoUsuarioServicio.js'
import { verificarAceptacionDeSolicitud, verificarActualizacionMiembroInterno, verificarCreacionDeMiembroInterno, verificarEliminacionMiembroInterno, verificarObtencionMiembroInterno, verificarSolicitud } from '../middlewares/miembrosInternosEquipoMiddlewares.js'
import { actualizar, crear, obtener } from '../controllers/miembrosInternosEquipoControllers.js'

const router = Router()

// Crear un miembro en el equipo
router.post('/', estaAutenticadoServicio, verificarCreacionDeMiembroInterno, crear)

// // MIEMBRO_INTERNO-TODO: Solicitar a un usuario que sea miembro de un equipo
// router.post('/enviar-solicitud', estaAutenticadoUsuarioServicio, verificarSolicitud, solicitar)

// // MIEMBRO_INTERNO-TODO: Solicitar a un usuario que sea miembro de un equipo
// router.get('/aceptar-solicitud/:tokenSolicitud', estaAutenticadoUsuarioServicio, verificarAceptacionDeSolicitud, solicitar)

// Obtener miembro
router.get('/:uidEquipo/:uidMiembro', estaAutenticadoUsuarioServicio, verificarObtencionMiembroInterno, obtener)

// MIEMBRO_INTERNO-TODO: Actualizar miembro del equipo [rol | estado]
router.put('/:uidEquipo/:uidMiembro', estaAutenticadoUsuarioServicio, verificarActualizacionMiembroInterno, actualizar)

// // MIEMBRO_INTERNO-TODO: Eliminar miembro del equipo
// router.delete('/:uidEquipo/:uidMiembro', estaAutenticadoUsuarioServicio, verificarEliminacionMiembroInterno, eliminar)

export default router