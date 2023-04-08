import { Router } from 'express'
import { estaAutenticado } from '../middlewares/estaAutenticado.js'
import { verificarCreacionUsuario, verificarActualizacionUsuario, verificarActualizacionContrasena, verificarEliminacionUsuario, verificarRestauracionFotoPerfil, verificarRestauracionFotoPortada } from '../middlewares/usuariosMiddlewares.js'
import { crear, obtener, obtenerAuthentication, actualizar, actualizarContrasena, restaurarFotoPerfil, restaurarFotoPortada, eliminar, enviarVerificacionCorreo } from '../controllers/usuariosControllers.js'

const router = Router()

router.post('/', verificarCreacionUsuario, crear)

router.get('/:tipo/:valor', obtener)

router.get('/:tipo/:valor/authentication', obtenerAuthentication)

router.get('/enviarVerificacionCorreo', estaAutenticado, enviarVerificacionCorreo)

router.put('/', estaAutenticado, verificarActualizacionUsuario, actualizar)

router.put('/contrasena', estaAutenticado, verificarActualizacionContrasena, actualizarContrasena)

router.put('/restaurarFotoPerfil', estaAutenticado, verificarRestauracionFotoPerfil, restaurarFotoPerfil)

router.put('/restaurarFotoPortada', estaAutenticado, verificarRestauracionFotoPortada, restaurarFotoPortada)

// router.delete('/', estaAutenticado, verificarEliminacionUsuario, eliminar)

export default router