import { styleVerificacionCorreoUsuario } from './styleVerificacionCorreoUsuario.js'

export const generarHtmlVerificacionCorreoUsuario = (correo = '', linkVerificacionCorreoUsuario = '') => {
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset='utf-8'>
            <meta http-equiv='X-UA-Compatible' content='IE=edge'>
            <title>Verificacion de correo</title>
            <meta name='viewport' content='width=device-width, initial-scale=1'>
            <style>
                ${styleVerificacionCorreoUsuario}
            </style>
        </head>
        <body>
            <p>¡Hola <b>${correo}</b>!</p>
            <a href="${linkVerificacionCorreoUsuario}">Verificar correo</a>
        </body>
    </html>
    `
}