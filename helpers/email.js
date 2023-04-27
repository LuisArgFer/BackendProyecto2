import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;
  console.log(datos);
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "3c0437d356bdf8",
      pass: "15b1bc5bc0ffe3"
    }
  });
  // Información del email

  const info = await transport.sendMail({
    from: '"Noticias - Administrador de Noticias" <netredwork@gmail.com>',
    to: email,
    subject: "Noticias - Comprueba tu cuenta",
    text: "Comprueba tu cuenta en Noticias",
    html: `<p>Hola: ${nombre} Comprueba tu cuenta en Noticias</p>
    <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace: 

    <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
    
    <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
    
    
    `,
  });
};

export const emailAcceso = async (datos) => {
  const { email, nombre, token } = datos;
  console.log(datos);
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "3c0437d356bdf8",
      pass: "15b1bc5bc0ffe3"
    }
  });
  // Información del email

  const info = await transport.sendMail({
    from: '"Noticias - Administrador de Noticias" <netredwork@gmail.com>',
    to: email,
    subject: "Noticias - Accede a tu cuenta",
    text: "Accede a tu cuenta en Noticias",
    html: `<p>Hola ${nombre} Accede a tu cuenta en Noticias</p>
    <p>Tu cuenta ya esta lista, solo debes acceder en el siguiente enlace: 

    <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
    
    <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
    
    
    `,
  });
};

export const emailOlvidePassword = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Información del email

  const info = await transport.sendMail({
    from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
    to: email,
    subject: "UpTask - Reestablece tu Password",
    text: "Reestablece tu Password",
    html: `<p>Hola: ${nombre} has solicitado reestablecer tu password</p>

    <p>Sigue el siguiente enlace para generar un nuevo password: 

    <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password</a>
    
    <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>
    
    
    `,
  });
};
