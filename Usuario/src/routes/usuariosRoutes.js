import { Router } from 'express'
import { crear } from '../controllers/usuariosControllers.js'

const router = Router()

router.post('/', crear)

router.get('/:tipo/:valor')

router.put('/:tipo/:valor')

router.delete('/:tipo/:valor')

export default router