import { Router } from 'express'
import { estaAutenticado } from '../middlewares/estaAutenticado.js'
import { verificarCreacionUsuario, verificarActualizacionUsuario, verificarActualizacionContrasena, verificarEliminacionUsuario, verificarReevioCorreoVerificacion, verificarRestauracionFotoPerfil, verificarRestauracionFotoPortada } from '../middlewares/usuariosMiddlewares.js'
import { crear, obtener, obtenerAuthentication, actualizar, reeviarCorreoVerificacion, actualizarContrasena, restaurarFotoPerfil, restaurarFotoPortada, eliminar } from '../controllers/usuariosControllers.js'

const router = Router()

router.post('/', verificarCreacionUsuario, crear)

router.get('/:tipo/:valor', obtener)

router.put('/', estaAutenticado, verificarActualizacionUsuario, actualizar)

router.put('/restaurarFotoPerfil', estaAutenticado, verificarRestauracionFotoPerfil, restaurarFotoPerfil)

router.put('/restaurarFotoPortada', estaAutenticado, verificarRestauracionFotoPortada, restaurarFotoPortada)

// router.delete('/', estaAutenticado, verificarEliminacionUsuario, eliminar)

export default router