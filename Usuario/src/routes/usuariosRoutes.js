import { Router } from 'express'
import { crear, obtener } from '../controllers/usuariosControllers.js'

const router = Router()

router.post('/', crear)

router.get('/:tipo/:valor', obtener)

router.put('/:tipo/:valor')

router.delete('/:tipo/:valor')

export default router