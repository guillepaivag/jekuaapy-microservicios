import { getAuth } from 'firebase-admin/auth'
import defaultApp from './firebase-app.js'

const firebaseAuthenticationService = getAuth(defaultApp)

export default firebaseAuthenticationService