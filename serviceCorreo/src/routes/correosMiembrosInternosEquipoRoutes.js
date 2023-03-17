import { Router } from 'express'
import { estaAutenticadoServicio } from '../middlewares/estaAutenticadoServicio.js'

const router = Router()

// // Enviar verificacion de correo de usuario
// router.post('/verificarCorreo', estaAutenticadoServicio, verificarEnvioDeVerificacionDeCorreo, verificarCorreoDeUsuario)

export default router