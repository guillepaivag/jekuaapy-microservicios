import { Router } from 'express'
import { estaAutenticadoServicio } from '../middlewares/estaAutenticadoServicio.js'
import { enviarAvisoNuevoMiembroEquipo, enviarAvisoNuevoMiembroProyecto } from '../controllers/correosMiembrosControllers.js'

const router = Router()

// Enviar aviso a usuario de su acceso al equipo
router.post('/avisoNuevoMiembroEquipo', estaAutenticadoServicio, enviarAvisoNuevoMiembroEquipo)

// Enviar aviso a usuario de su acceso a un proyecto de un equipo
router.post('/avisoNuevoMiembroProyecto', estaAutenticadoServicio, enviarAvisoNuevoMiembroProyecto)

export default router