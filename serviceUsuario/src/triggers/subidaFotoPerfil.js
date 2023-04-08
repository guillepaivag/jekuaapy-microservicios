import functions from "firebase-functions"
import config from '../configs/config.js'

// Usuarios
import FirestoreUsuariosRepository from "../repositories/FirestoreUsuariosRepository.js"
import UsuariosUseCase from "../usecases/UsuariosUseCase.js"

// Foto de perfil
import StorageFotoPerfilRepository from "../repositories/StorageFotoPerfilRepository.js"
import FotoPerfilUseCase from "../usecases/FotoPerfilUseCase.js"

// Variables
const bucketNameFotoPerfil = config.buckets.fotoPerfil
const usuariosUseCase = new UsuariosUseCase(new FirestoreUsuariosRepository())
const fotoPerfilUseCase = new FotoPerfilUseCase(new StorageFotoPerfilRepository())

export const subidaFotoPerfil = functions
.region('southamerica-east1')
.storage
.bucket(bucketNameFotoPerfil)
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
        if (config.production && context.auth.uid !== uidUsuario) throw new Error('Solo puedes cambiar tu foto de perfil.')

        // La foto de perfil solamente se acepta en 3 extensiones: png | jpg | jpeg
        if (fileExtension !== 'png' && fileExtension !== 'jpg' && fileExtension !== 'jpeg') throw new Error('Extensión incorrecta.')

        // Verificaciones de tamano
        const sizeBytes = Number(object.size)
        const sizeMB = sizeBytes / 1024 / 1024
        if (sizeMB > 5) throw new Error('La foto de perfil solo puede pesar hasta 5MB.')

        // Eliminar la foto publicada
        if (usuario.fotoPerfil !== '' && usuario.fotoPerfil !== 'default') {
            estadoSubida.value = 'eliminacion_de_foto_vieja'
            await fotoPerfilUseCase.eliminar(`${uidUsuario}/foto.`)
        }

        // Publicar la foto verificada
        estadoSubida.value = 'moviendo_foto_nueva'
        const newFile = await fotoPerfilUseCase.mover(`${uidUsuario}/verificacion/`, `${uidUsuario}/foto.${fileExtension}`)

        // Actualizar foto de perfil en la base de datos
        estadoSubida.value = 'actualizando_foto'
        await usuariosUseCase.actualizar(uidUsuario, {
            fotoPerfil: newFile.publicUrl()
        })

        return true

    } catch (error) {
        console.log('Error al actualizar una foto de perfil: ', error)

        if (estadoSubida.value === 'verificacion') await fotoPerfilUseCase.eliminar(object.name)
        else if (estadoSubida.value === 'eliminacion_de_foto_vieja') await fotoPerfilUseCase.eliminar(object.name)
        else if (estadoSubida.value === 'moviendo_foto_nueva') await fotoPerfilUseCase.eliminar(object.name)
        else if (estadoSubida.value === 'actualizando_foto') {
            await fotoPerfilUseCase.eliminar(`${uidUsuario}/foto.`)
            await usuariosUseCase.actualizar(uidUsuario, { fotoPerfil: '' })
        }
    }
    
})