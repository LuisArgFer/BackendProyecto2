import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import Roles from "../models/Roles.js";
import sendSMS from "../helpers/twilio.js";
import { emailRegistro, emailOlvidePassword, emailAcceso } from "../helpers/email.js";

const registrar = async (req, res) => {
  // Evitar registros duplicados
  const { email } = req.body;
  const existeUsuario = await Usuario.findOne({ email });

  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const usuario = new Usuario(req.body);
    usuario.token = generarId();
    usuario.role_id = "6412339f0c629befbd6fe788";
    // Buscamos el objeto del rol en la base de datos
    const rolObj = await Roles.findById(usuario.role_id);
    if (!rolObj) {
      const error = new Error("Rol de usuario invalido");
      return res.status(400).json({ msg: error.message });
    }
    await usuario.save();

    // Enviar el email de confirmacion
    emailRegistro({
      email: usuario.email,
      nombre: usuario.nombre,
      token: usuario.token,
    });

    res.status(201).json({
      msg: "Usuario Creado Correctamente, Revisa tu Email para confirmar tu cuenta",
    });
  } catch (error) {
    console.log(error);
  }
};
const passwordless = async (req, res) => {
  const { email } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("Usuario no ha sido registrado");
    return res.status(400).json({ msg: error.message });
  }
  
  try {
    usuario.token = generarId();
    await usuario.save();
    // Enviar el email de acceso
    emailAcceso({
      email: usuario.email,
      nombre: usuario.nombre,
      token: usuario.token,
    });

    res.status(201).json({
      msg: "Link de acceso enviado al correo",
    });
  } catch (error) {
    console.log(error);
  }
}
const verificar2FA = async (req, res) => {
  const { userId } = req.params;
  const { verificationCode } = req.body;
  console.log(userId);
  console.log(verificationCode);
  const usuario = await Usuario.findById(userId);

  if (!usuario) {
    const error = new Error("El Usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  if (usuario.token === verificationCode) {
    usuario.token = "";
    await usuario.save();

    res.status(201).json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      role: usuario.role_id,
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error("El código de verificación es incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;
  
  // Comprobar si el usuario existe
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El Usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  // Comprobar si el usuario esta confirmado
  if (!usuario.confirmado) {
    const error = new Error("Tu Cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message });
  }

  // Comprobar su password
  if (await usuario.comprobarPassword(password)) {
    // Generar código de verificación
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Almacenar el código de verificación temporalmente en el usuario
    usuario.token = verificationCode;
    await usuario.save();

    // Enviar el código de verificación por SMS
    await sendSMS("+506" + usuario.phone, `Tu código de verificación es: ${verificationCode}`);

    res.status(201).json({
      msg: "Se ha enviado un código de verificación por SMS",
      userId: usuario._id,
      token: generarJWT(usuario._id), // Enviar el userId para su uso en el frontend
    });
  } else {
    const error = new Error("El Password es Incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

const confirmar = async (req, res) => {
  const { token } = req.params;
  const usuarioConfirmar = await Usuario.findOne({ token });
  if (!usuarioConfirmar) {
    const error = new Error("Token no válido");
    return res.status(403).json({ msg: error.message });
  }

  try {
    usuarioConfirmar.confirmado = true;
    usuarioConfirmar.token = "";
    await usuarioConfirmar.save();
    res.json({
      _id: usuarioConfirmar._id,
      nombre: usuarioConfirmar.nombre,
      email: usuarioConfirmar.email,
      role: usuarioConfirmar.role_id,
      token: generarJWT(usuarioConfirmar._id),
    });
  } catch (error) {
    console.log(error);
  }
};

const olvidePassword = async (req, res) => {
  const { email } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El Usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuario.token = generarId();
    await usuario.save();

    // Enviar el email
    /*emailOlvidePassword({
      email: usuario.email,
      nombre: usuario.nombre,
      token: usuario.token,
    });*/

    res.json({ msg: "Hemos enviado un email con las instrucciones" });
  } catch (error) {
    console.log(error);
  }
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;

  const tokenValido = await Usuario.findOne({ token });

  if (tokenValido) {
    res.json({ msg: "Token válido y el Usuario existe" });
  } else {
    const error = new Error("Token no válido");
    return res.status(404).json({ msg: error.message });
  }
};

const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const usuario = await Usuario.findOne({ token });

  if (usuario) {
    usuario.password = password;
    usuario.token = "";
    try {
      await usuario.save();
      res.json({ msg: "Password Modificado Correctamente" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Token no válido");
    return res.status(404).json({ msg: error.message });
  }
};

const perfil = async (req, res) => {
  const { usuario } = req;

  res.json(usuario);
};

export {
  registrar,
  verificar2FA,
  passwordless,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
};
