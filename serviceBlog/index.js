import functions from 'firebase-functions'
import * as dotenv from 'dotenv'

console.log('dotenv.config()', dotenv.config())

console.log('process.env.ALGOLIA_APP_ID', process.env.ALGOLIA_APP_ID)
console.log('process.env.ALGOLIA_API_KEY', process.env.ALGOLIA_API_KEY)
console.log('process.env.ENVIRONMENT', process.env.ENVIRONMENT)