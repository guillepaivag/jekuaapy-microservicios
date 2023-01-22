export const setUrlsApis = (isProduction = false, isLocal = false) => {
    const apiUsuario = setUrlApi('usuario', isProduction, isLocal)
    const apiCorreo = setUrlApi('correo', isProduction, isLocal)
    const apiBlog = setUrlApi('blog', isProduction, isLocal)
    const apiCursoBorrador = setUrlApi('cursoBorrador', isProduction, isLocal)
    const apiCursoPublicado = setUrlApi('cursoPublicado', isProduction, isLocal)
    const apiEquipo = setUrlApi('equipo', isProduction, isLocal)
    const apiExamen = setUrlApi('examen', isProduction, isLocal)
    const apiPedido = setUrlApi('pedido', isProduction, isLocal)

    return {
        apiUsuario,
        apiCorreo,
        apiBlog,
        apiCursoBorrador,
        apiCursoPublicado,
        apiEquipo,
        apiExamen,
        apiPedido,
    }
}

const setUrlApi = (service = '', isProduction = false, isLocal = false) => {
    const data = {
        usuario: {
            prod: '',
            devLocal: 'http://127.0.0.1:7000/jekuaapydev1/southamerica-east1/service_usuario',
            devRemote: '',
        },
        correo: {
            prod: '',
            devLocal: 'http://127.0.0.1:7000/jekuaapydev1/southamerica-east1/service_correo',
            devRemote: '',
        },
        blog: {
            prod: '',
            devLocal: 'http://127.0.0.1:7000/jekuaapydev1/southamerica-east1/service_blog',
            devRemote: '',
        },
        cursoBorrador: {
            prod: '',
            devLocal: 'http://127.0.0.1:7000/jekuaapydev1/southamerica-east1/service_cursoBorrador',
            devRemote: '',
        },
        cursoPublicado: {
            prod: '',
            devLocal: 'http://127.0.0.1:7000/jekuaapydev1/southamerica-east1/service_cursoPublicado',
            devRemote: '',
        },
        equipo: {
            prod: '',
            devLocal: 'http://127.0.0.1:7000/jekuaapydev1/southamerica-east1/service_equipo',
            devRemote: '',
        },
        examen: {
            prod: '',
            devLocal: 'http://127.0.0.1:7000/jekuaapydev1/southamerica-east1/service_examen',
            devRemote: '',
        },
        pedido: {
            prod: '',
            devLocal: 'http://127.0.0.1:7000/jekuaapydev1/southamerica-east1/service_pedido',
            devRemote: '',
        },
    }
    
    const tipoUrl = isProduction ? 'prod' :
    (isLocal ? 'devLocal' : 'devRemote')

    return data[service][tipoUrl]
}