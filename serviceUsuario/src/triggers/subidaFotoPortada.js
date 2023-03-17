import functions from "firebase-functions"
import config from '../configs/config.js'

// Usuarios
import FirestoreUsuariosRepository from "../repositories/FirestoreUsuariosRepository.js"
import UsuariosUseCase from "../usecases/UsuariosUseCase.js"

// Foto de portada
import StorageFotoPortadaRepository from "../repositories/StorageFotoPortadaRepository.js"
import FotoPortadaUseCase from "../usecases/FotoPortadaUseCase.js"

// Variables
const bucketNameFotoPortada = config.buckets.fotoPortada
const usuariosUseCase = new UsuariosUseCase(new FirestoreUsuariosRepository())
const fotoPortadaUseCase = new FotoPortadaUseCase(new StorageFotoPortadaRepository())

export const subidaFotoPortada = functions
.region('southamerica-east1')
.storage
.bucket(bucketNameFotoPortada)
.object().onFinalize(async (object, context) => {
    console.log('object', JSON.stringify(object))
    console.log('context', JSON.stringify(context))
    
    /**
     * Formato Object Verificacion: uidUsuario/verificacion/nombre.extension
     * Formato Object Completado: uidUsuario/foto.extension
     */

    const array1 = object.name.split('/')
    const array2 = object.name.split('.')

    const uidUsuario = array1[0]
    const tipo = array1[1]
    const fileExtension = array2[array2.length-1]

    const estadoSubida = { value: 'verificacion' }

    try {
        // Tipo: Solamente en verificacion
        if ( tipo !== 'verificacion' ) return

        // Usuario solicitante existente
        const usuario = await usuariosUseCase.obtenerPorUID(uidUsuario)
        if (!usuario || usuario.estado === 'eliminado') throw new Error('No existe el usuario.')

        // Usuario solicitante valido
        if (config.production && context.auth.uid !== uidUsuario) throw new Error('No puedes cambiar la foto de portada de los demas.')

        // La foto de portada solamente se acepta en 3 extensiones: png | jpg | jpeg
        if (fileExtension !== 'png' && fileExtension !== 'jpg' && fileExtension !== 'jpeg') throw new Error('Extensión incorrecta.')

        // Verificaciones de tamano
        const sizeBytes = Number(object.size)
        const sizeMB = sizeBytes / 1024 / 1024
        if (sizeMB > 5) throw new Error('La foto de portada solo puede pesar hasta 5MB.')

        // Eliminar la foto publicada
        if (usuario.fotoPortada !== '' && usuario.fotoPortada !== 'default') {
            estadoSubida.value = 'eliminacion_de_foto_vieja'
            await fotoPortadaUseCase.eliminar(`${uidUsuario}/foto.`)
        }

        // Publicar la foto verificada
        estadoSubida.value = 'moviendo_foto_nueva'
        const newFile = await fotoPortadaUseCase.mover(`${uidUsuario}/verificacion/`, `${uidUsuario}/foto.${fileExtension}`)

        // Actualizar foto de portada en la base de datos
        estadoSubida.value = 'actualizando_foto'
        await usuariosUseCase.actualizar(uidUsuario, {
            fotoPortada: newFile.publicUrl()
        })

        return true

    } catch (error) {
        console.log('Error al actualizar una foto de portada: ', error)

        if (estadoSubida.value === 'verificacion') await fotoPortadaUseCase.eliminar(object.name)
        else if (estadoSubida.value === 'eliminacion_de_foto_vieja') await fotoPortadaUseCase.eliminar(object.name)
        else if (estadoSubida.value === 'moviendo_foto_nueva') await fotoPortadaUseCase.eliminar(object.name)
        else if (estadoSubida.value === 'actualizando_foto') {
            await fotoPortadaUseCase.eliminar(`${uidUsuario}/foto.`)
            await usuariosUseCase.actualizar(uidUsuario, { fotoPortada: '' })
        }
    }
    
})