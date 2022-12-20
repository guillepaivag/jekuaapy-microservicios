import defaultApp from './firebase-app.js'
import { getFirestore } from 'firebase-admin/firestore'

const db = getFirestore(defaultApp)

export default db