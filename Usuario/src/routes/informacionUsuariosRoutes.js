import { Router } from 'express'
const router = Router()

router.post('/:uid/informacion')

router.get('/:tipo/:valor/informacion')

router.put('/:uid/informacion')

router.delete('/:uid/informacion')

export default router