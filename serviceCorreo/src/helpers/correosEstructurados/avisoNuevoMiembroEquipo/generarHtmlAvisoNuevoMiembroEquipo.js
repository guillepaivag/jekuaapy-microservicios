import style from './style.js'

export const generarHtmlAvisoNuevoMiembroEquipo = (data = params) => {
    const { correo, usuario, equipo } = data
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
            <p>¡Hola <b>${correo}</b>!</p>
            <p>Te proporcioné acceso al equipo ${equipo.nombre} de Jekuaapy.</p>
            <a href="${linkVerMas}">Ver más</a>
        </body>
    </html>
    `
}

const params = {
    correo: '',
    usuario: {}, 
    equipo: {},
}