import style from './style.js'

export const generarHtmlAvisoNuevoMiembroProyecto = (data = params) => {
    const { usuarioSolicitante, usuarioSolicitado, equipo, proyecto } = data
    const linkVerMas = ''

    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset='utf-8'>
            <meta http-equiv='X-UA-Compatible' content='IE=edge'>
            <title>Verificacion de correo</title>
            <meta name='viewport' content='width=device-width, initial-scale=1'>
            <style>
                ${style}
            </style>
        </head>
        <body>
            <p>¡Hola <b>${usuarioSolicitado.correo}</b>!</p>
            <p>Te proporcioné acceso al proyecto ${proyecto.nombre} del equipo ${equipo.nombre} de Jekuaapy.</p>
            <a href="${linkVerMas}">Ver más</a>
        </body>
    </html>
    `
}

const params = {
    usuarioSolicitante: {},
    usuarioSolicitado: {}, 
    equipo: {},
    proyecto: {},
}