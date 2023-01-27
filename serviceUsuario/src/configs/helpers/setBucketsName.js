export const setBucketsName = (isProduction = false) => {
    const bucketNameFotoPerfil = setBucketName('fotoPerfil', isProduction)
    const bucketNameFotoPortada = setBucketName('fotoPortada', isProduction)

    return {
        bucketNameFotoPerfil,
        bucketNameFotoPortada,
    }
}

const setBucketName = (code = '', isProduction = false) => {
    const data = {
        'fotoPerfil': {
            prod: 'jekuaapy-usuarios-foto_perfil',
            devRemote: 'jekuaapydev1-usuarios-foto_perfil',
        },
        'fotoPortada': {
            prod: 'jekuaapy-usuarios-foto_portada',
            devRemote: 'jekuaapydev1-usuarios-foto_portada',
        },
    }

    const tipo = isProduction ? 'prod' : 'devRemote'

    return data[code][tipo]
}