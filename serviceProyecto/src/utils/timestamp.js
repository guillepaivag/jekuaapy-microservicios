import admin from '../../firebase-service/firebase-admin.js'

export const milliseconds_a_timestamp = ( milliseconds = Date.now() ) => {
    if ( !milliseconds ) return null
    let timestamp = admin.firestore.Timestamp.fromMillis ( milliseconds )

    return timestamp
}
