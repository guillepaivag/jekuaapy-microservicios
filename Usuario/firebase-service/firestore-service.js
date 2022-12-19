import defaultApp from './firebase-default-app.js'
import { getFirestore } from 'firebase-admin/firestore'

const db = getFirestore(defaultApp)

export default db