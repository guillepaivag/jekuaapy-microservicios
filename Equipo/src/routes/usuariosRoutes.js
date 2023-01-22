import { Router } from 'express'
const router = Router()

router.post('/')

router.get('/:tipo/:valor')

router.put('/:tipo/:valor')

router.delete('/:tipo/:valor')

export default router