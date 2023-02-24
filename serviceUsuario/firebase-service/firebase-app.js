import { initializeApp } from 'firebase-admin/app'
import admin from './firebase-admin.js'
import config from '../src/configs/config.js'

const app = initializeApp({ credential: admin.credential.cert(config.credentials) })

console.log('Administracion de firebase lista')

export default app