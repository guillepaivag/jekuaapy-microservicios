import { Router } from 'express'
import { crear, actualizar, eliminar, obtener  } from '../controllers/EquipoControllers.js'
import { 
    validacionEquipoGet,
    validacionEquipoPost,
    validacionEquipoPut,
    validacionEquipoDelete,
} from "../middlewares/EquipoMiddlewares.js"

//import { estaAutenticado } from '../middlewares/estaAutenticado.js'

const router = Router()

router.post('/', validacionEquipoPost, crear)

router.get('/:tipo/:valor', validacionEquipoGet, obtener)

router.put('/:uid', validacionEquipoPut, actualizar)

router.delete('/:uid', validacionEquipoDelete, eliminar)

export default router