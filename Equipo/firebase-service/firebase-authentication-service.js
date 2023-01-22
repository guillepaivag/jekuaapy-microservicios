import defaultApp from './firebase-app.js'
import { getAuth } from 'firebase-admin/auth'

const auth = getAuth(defaultApp)

export default auth