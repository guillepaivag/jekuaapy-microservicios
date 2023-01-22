import firebaseStorageService from '../../firebase-service/firebase-storage-service.js'
import config from '../configs/config.js'

class StorageFotoPortadaRepository {
    constructor (isTest) {
        this.isTest = isTest
    }

    async obtenerUrlPublica (prefix = '') {
        const bucketName = config.buckets.bucketNameFotoPortada
        const response = await firebaseStorageService.bucket(bucketName).getFiles({ prefix })

        const files = response[0]
        const file = files[0]

        return file.publicUrl()
    }

    async eliminar (prefix = '') {
        const bucketName = config.buckets.bucketNameFotoPortada
        const response = await firebaseStorageService.bucket(bucketName).getFiles({ prefix })

        const files = response[0]
        const file = files[0]

        await file.delete()
    }

    async mover (prefix = '', destino = '') {
        const bucketName = config.buckets.bucketNameFotoPortada
        const response = await firebaseStorageService.bucket(bucketName).getFiles({ prefix })

        const files = response[0]
        const file = files[0]

        const data = await file.move(destino)
        const newFile = data[0]

        return newFile
    }
}

export default StorageFotoPortadaRepository