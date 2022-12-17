// import admin from 'firebase-admin'

// const config = require('./config')

// const isProduction = config.environment.mode === 'production'
// let serviceAccount = null

// if (isProduction) serviceAccount = require('./serviceAccountKey.json')
// else serviceAccount = require('./serviceAccountKeyDev.json')

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// })

// // console.log('process.env.ALGOLIA_APP_ID', process.env.ALGOLIA_APP_ID)
// // console.log('process.env.ALGOLIA_API_KEY', process.env.ALGOLIA_API_KEY)
// // console.log('process.env.ENVIRONMENT', process.env.ENVIRONMENT)

// console.log('Administracion de firebase lista')

// module.exports = admin