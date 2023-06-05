import { getStorage } from 'firebase-admin/storage'
import defaultApp from './firebase-app.js'

const firebaseStorageService = getStorage(defaultApp)

export default firebaseStorageService