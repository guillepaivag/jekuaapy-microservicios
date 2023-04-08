import { Router } from 'express'
import { estaAutenticadoUsuario } from '../middlewares/estaAutenticadoUsuario.js'
import { estaAutenticadoUsuarioServicio } from '../middlewares/estaAutenticadoUsuarioServicio.js'
import { verificarCreacionEquipo, verificarActualizacionEquipo, verificarEliminacionEquipo, } from "../middlewares/equiposMiddlewares.js"
import { crear, obtener, actualizar, eliminar } from '../controllers/equiposControllers.js'

const router = Router()



/**
 * 1. El cliente solicita una creacion de equipo
 * 2. Se verifican datos iniciales: codigo, nombre, descripcion
 * 3. Crea el equipo y un miembro
*/
router.post('/', estaAutenticadoUsuario, verificarCreacionEquipo, crear)





/**
 * 
*/
router.get('/:uid', obtener)





/**
 * 
*/
router.put('/:uid', estaAutenticadoUsuarioServicio, verificarActualizacionEquipo, actualizar)





/**
 * 
*/
router.delete('/:uid', estaAutenticadoUsuario, verificarEliminacionEquipo, eliminar)




export default router