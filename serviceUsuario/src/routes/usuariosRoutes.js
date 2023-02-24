import { Router } from 'express'
import { estaAutenticado } from '../middlewares/estaAutenticado.js'
import { verificarCreacionUsuario, verificarActualizacionUsuario, verificarActualizacionContrasena, verificarEliminacionUsuario, verificarRestauracionFotoPerfil, verificarRestauracionFotoPortada } from '../middlewares/usuariosMiddlewares.js'
import { crear, obtener, obtenerAuthentication, actualizar, actualizarContrasena, restaurarFotoPerfil, restaurarFotoPortada, eliminar } from '../controllers/usuariosControllers.js'

const router = Router()

// router.get('/googleToken', async (req, res) => {
//     const baseUrl = 'service_usuario'
//     const idToken = await googleToken(baseUrl)
//     const loginTicket = await googleVerifyToken(idToken)

//     res.json({ idToken, loginTicket })
// })

router.post('/', verificarCreacionUsuario, crear)

router.get('/:tipo/:valor', obtener)

router.get('/:tipo/:valor/authentication', obtenerAuthentication)

router.put('/', estaAutenticado, verificarActualizacionUsuario, actualizar)

router.put('/contrasena', estaAutenticado, verificarActualizacionContrasena, actualizarContrasena)

router.put('/restaurarFotoPerfil', estaAutenticado, verificarRestauracionFotoPerfil, restaurarFotoPerfil)

router.put('/restaurarFotoPortada', estaAutenticado, verificarRestauracionFotoPortada, restaurarFotoPortada)

// router.delete('/', estaAutenticado, verificarEliminacionUsuario, eliminar)

export default router