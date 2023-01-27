export const setUrlsApis = (isProduction = false, isLocal = false) => {
    const apiUsuario = setUrlApi('usuario', isProduction, isLocal)
    const apiCorreo = setUrlApi('correo', isProduction, isLocal)
    const apiEquipo = setUrlApi('equipo', isProduction, isLocal)
    const apiPedido = setUrlApi('pedido', isProduction, isLocal)
    const apiBlog = setUrlApi('blog', isProduction, isLocal)
    const apiCursoBorrador = setUrlApi('cursoBorrador', isProduction, isLocal)
    const apiCursoPublicado = setUrlApi('cursoPublicado', isProduction, isLocal)
    const apiExamen = setUrlApi('examen', isProduction, isLocal)

    return {
        apiUsuario,
        apiCorreo,
        apiEquipo,
        apiPedido,
        apiBlog,
        apiCursoBorrador,
        apiCursoPublicado,
        apiExamen,
    }
}

const setUrlApi = (service = '', isProduction = false, isLocal = false) => {
    const data = {
        usuario: {
            prod: 'https://southamerica-east1-jekuaa-py.cloudfunctions.net/service_usuario',
            devLocal: 'http://127.0.0.1:7000/jekuaapydev1/southamerica-east1/service_usuario',
            devRemote: 'https://southamerica-east1-jekuaapydev1.cloudfunctions.net/service_usuario',
        },
        correo: {
            prod: 'https://southamerica-east1-jekuaa-py.cloudfunctions.net/service_correo',
            devLocal: 'http://127.0.0.1:7001/jekuaapydev1/southamerica-east1/service_correo',
            devRemote: 'https://southamerica-east1-jekuaapydev1.cloudfunctions.net/service_correo',
        },
        equipo: {
            prod: 'https://southamerica-east1-jekuaa-py.cloudfunctions.net/service_equipo',
            devLocal: 'http://127.0.0.1:7002/jekuaapydev1/southamerica-east1/service_equipo',
            devRemote: 'https://southamerica-east1-jekuaapydev1.cloudfunctions.net/service_equipo',
        },
        pedido: {
            prod: 'https://southamerica-east1-jekuaa-py.cloudfunctions.net/service_pedido',
            devLocal: 'http://127.0.0.1:7003/jekuaapydev1/southamerica-east1/service_pedido',
            devRemote: 'https://southamerica-east1-jekuaapydev1.cloudfunctions.net/service_pedido',
        },
        blog: {
            prod: 'https://southamerica-east1-jekuaa-py.cloudfunctions.net/service_blog',
            devLocal: 'http://127.0.0.1:7000/jekuaapydev1/southamerica-east1/service_blog',
            devRemote: 'https://southamerica-east1-jekuaapydev1.cloudfunctions.net/service_blog',
        },
        cursoBorrador: {
            prod: 'https://southamerica-east1-jekuaa-py.cloudfunctions.net/service_cursoBorrador',
            devLocal: 'http://127.0.0.1:7000/jekuaapydev1/southamerica-east1/service_cursoBorrador',
            devRemote: 'https://southamerica-east1-jekuaapydev1.cloudfunctions.net/service_cursoBorrador',
        },
        cursoPublicado: {
            prod: 'https://southamerica-east1-jekuaa-py.cloudfunctions.net/service_cursoPublicado',
            devLocal: 'http://127.0.0.1:7000/jekuaapydev1/southamerica-east1/service_cursoPublicado',
            devRemote: 'https://southamerica-east1-jekuaapydev1.cloudfunctions.net/service_cursoPublicado',
        },
        examen: {
            prod: 'https://southamerica-east1-jekuaa-py.cloudfunctions.net/service_examen',
            devLocal: 'http://127.0.0.1:7000/jekuaapydev1/southamerica-east1/service_examen',
            devRemote: 'https://southamerica-east1-jekuaapydev1.cloudfunctions.net/service_examen',
        },
    }
    
    const tipoUrl = isProduction ? 'prod' :
    (isLocal ? 'devLocal' : 'devRemote')

    return data[service][tipoUrl]
}