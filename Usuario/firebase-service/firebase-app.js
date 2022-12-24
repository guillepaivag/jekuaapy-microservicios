import { initializeApp, cert } from 'firebase-admin/app'
import serviceAccountKeyProd from './credentials/serviceAccountKeyProd.json' assert { type: 'json' }
import serviceAccountKeyDev from './credentials/serviceAccountKeyDev.json' assert { type: 'json' }
import serviceAccountKeyTest from './credentials/serviceAccountKeyTest.json' assert { type: 'json' }

const environment = process.env.ENVIRONMENT
let serviceAccount = null

if (environment === 'production') serviceAccount = serviceAccountKeyProd
else if (environment === 'development') serviceAccount = serviceAccountKeyDev
else serviceAccount = serviceAccountKeyTest

const app = initializeApp({ credential: cert(serviceAccount) })

console.log('Administracion de firebase lista')

export default app