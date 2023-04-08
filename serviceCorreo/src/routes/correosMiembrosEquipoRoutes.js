import { Router } from 'express'
import { estaAutenticadoServicio } from '../middlewares/estaAutenticadoServicio.js'
import { enviarAvisoNuevoMiembroEquipo } from '../controllers/correosMiembroEquipoControllers.js'

const router = Router()

// Enviar solicitud a usuario para ser miembro de un equipo
router.post('/avisoNuevoMiembroEquipo', estaAutenticadoServicio, enviarAvisoNuevoMiembroEquipo)

export default router