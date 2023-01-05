import { Router } from 'express'
import { estaAutenticado } from '../middlewares/estaAutenticado.js'
import { verificarCreacionUsuario, verificarActualizacionUsuario, verificarActualizacionContrasena, verificarEliminacionUsuario } from '../middlewares/usuariosMiddlewares.js'
import { crear, obtener, obtenerAuthentication, actualizar, actualizarContrasena, eliminar } from '../controllers/usuariosControllers.js'

const router = Router()

router.post('/', verificarCreacionUsuario, crear)

router.get('/:tipo/:valor', obtener)

router.get('/:tipo/:valor/authentication', obtenerAuthentication)

router.put('/', estaAutenticado, verificarActualizacionUsuario, actualizar)

// eliminarFotoPerfil

// reeviarCorreoVerificacion

router.put('/contrasena', estaAutenticado, verificarActualizacionContrasena, actualizarContrasena)

router.delete('/', estaAutenticado, verificarEliminacionUsuario, eliminar)

export default router