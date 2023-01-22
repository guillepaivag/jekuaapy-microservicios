export const setBucketsName = (isProduction = false, isLocal = false) => {
    const bucketNameFotoPerfil = setBucketName('fotoPerfil', isProduction, isLocal)
    const bucketNameFotoPortada = setBucketName('fotoPortada', isProduction, isLocal)

    return {
        bucketNameFotoPerfil,
        bucketNameFotoPortada,
    }
}

const setBucketName = (code = '', isProduction = false, isLocal = false) => {
    const data = {
        'fotoPerfil': {
            prod: '',
            devLocal: '',
            devRemote: '',
        },
        'fotoPortada': {
            prod: '',
            devLocal: '',
            devRemote: '',
        },
    }

    const tipo = isProduction ? 'prod' :
    (isLocal ? 'devLocal' : 'devRemote')

    return data[code][tipo]
}