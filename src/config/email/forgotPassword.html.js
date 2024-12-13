const getForgotPasswordHTML = (name, route) => {

    const forgotPasswordHTML = `<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Recuperación de Contraseña</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
                margin: 0;
                padding: 0;
            }
    
            .email-container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
    
            h1 {
                font-size: 24px;
                color: #4CAF50;
                text-align: center;
                margin-bottom: 20px;
            }
    
            p {
                font-size: 16px;
                line-height: 1.6;
                color: #555;
                margin: 10px 0;
            }
    
            .button {
                display: inline-block;
                background-color: #4CAF50;
                color: #ffffff;
                text-align: center;
                padding: 12px 24px;
                text-decoration: none;
                font-size: 16px;
                border-radius: 4px;
                margin-top: 20px;
            }
    
            .footer {
                font-size: 12px;
                color: #777;
                text-align: center;
                margin-top: 30px;
            }
    
            .footer a {
                color: #4CAF50;
                text-decoration: none;
            }

            .buttonContainer {
            display: flex;
            align-items: center;
            justify-content: center;
            }
    
            /* Responsive Styles */
            @media only screen and (max-width: 320px) {
                .email-container {
                    padding: 10px;
                }
                h1 {
                    font-size: 20px;
                }
                p {
                    font-size: 14px;
                }
                .button {
                    padding: 10px 20px;
                    font-size: 14px;
                }
            }
    
            @media only screen and (max-width: 700px) {
                .email-container {
                    padding: 15px;
                }
                h1 {
                    font-size: 22px;
                }
                p {
                    font-size: 15px;
                }
                .button {
                    padding: 10px 20px;
                    font-size: 15px;
                }
            }
    
            @media only screen and (min-width: 1300px) {
                .email-container {
                    max-width: 800px;
                }
                h1 {
                    font-size: 28px;
                }
                p {
                    font-size: 18px;
                }
                .button {
                    padding: 14px 28px;
                    font-size: 18px;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <h1>Recupera tu contraseña</h1>
            <p>Hola ${name},</p>
            <p>Hemos recibido una solicitud para restablecer tu contraseña en <strong>Slack-Clon</strong>. Si fuiste tú quien solicitó este cambio, puedes hacerlo siguiendo el enlace de abajo.</p>
            <p>Haz clic en el siguiente botón para restablecer tu contraseña:</p>
            <div class="buttonContainer">
                <a href="${route}" class="button">Restablecer mi contraseña</a>
            </div>
            <p>Si no solicitaste este cambio, por favor ignora este mensaje. No se realizarán cambios en tu cuenta.</p>
    
        </div>
    </body>
    </html>
    `

    return forgotPasswordHTML

}



export default getForgotPasswordHTML