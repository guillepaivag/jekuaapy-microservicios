import { initializeApp, cert } from 'firebase-admin/app'
import serviceAccountKeyProd from './credentials/serviceAccountKeyProd.json'
import serviceAccountKeyDev from './credentials/serviceAccountKeyDev.json'
import serviceAccountKeyTest from './credentials/serviceAccountKeyTest.json'

const environment = process.env.ENVIRONMENT
let serviceAccount = null

if (environment === 'production') serviceAccount = serviceAccountKeyProd
else if (environment === 'development') serviceAccount = serviceAccountKeyDev
else serviceAccount = serviceAccountKeyTest

const app = initializeApp({ credential: cert(serviceAccount) })

console.log(`ENVIRONMENT = ${process.env.ENVIRONMENT}`)
console.log('Administracion de firebase lista')

export default app