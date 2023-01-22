import { initializeApp, cert } from 'firebase-admin/app'
import serviceAccountKey from './credentials/serviceAccountKey.json'
import serviceAccountKeyDev from './credentials/serviceAccountKeyDev.json'

const isProduction = process.env.ENVIRONMENT === 'production'
let serviceAccount = null

if (isProduction) serviceAccount = serviceAccountKey
else serviceAccount = serviceAccountKeyDev

const app = initializeApp({ credential: cert(serviceAccount) })

console.log('process.env.ALGOLIA_APP_ID', process.env.ALGOLIA_APP_ID)
console.log('process.env.ALGOLIA_API_KEY', process.env.ALGOLIA_API_KEY)
console.log('process.env.ENVIRONMENT', process.env.ENVIRONMENT)

console.log('Administracion de firebase lista')

export default app