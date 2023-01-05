import generateStyleEmailVerification from './generateStyleEmailVerification.js'

const generateHtmlEmailVerification = (email = '', linkVerification = '') => {
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset='utf-8'>
            <meta http-equiv='X-UA-Compatible' content='IE=edge'>
            <title>Verificacion de correo</title>
            <meta name='viewport' content='width=device-width, initial-scale=1'>
            <style>
                ${generateStyleEmailVerification}
            </style>
        </head>
        <body>
            ¡Hola <b>${email}</b>!

            <p>
                <a target="_blank" href="${linkVerification}" class="btn btn-primary">
                    Verificar el correo
                </a>
            </p>
        </body>
    </html>
    `
}

export default generateHtmlEmailVerification