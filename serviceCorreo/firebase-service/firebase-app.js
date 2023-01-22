import { initializeApp } from 'firebase-admin/app'
import admin from './firebase-admin.js'

const app = initializeApp({ credential: admin.credential.applicationDefault() })

console.log('Administracion de firebase lista')

export default app