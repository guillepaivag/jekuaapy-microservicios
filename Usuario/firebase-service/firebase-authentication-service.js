import { getAuth } from 'firebase-admin/auth'
import defaultApp from './firebase-app.js'

const auth = getAuth(defaultApp)

export default auth