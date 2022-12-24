import { getFirestore } from 'firebase-admin/firestore'
import defaultApp from './firebase-app.js'

const firebaseFirestoreService = getFirestore(defaultApp)

export default firebaseFirestoreService