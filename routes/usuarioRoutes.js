import express from "express";
const router = express.Router();
import {
  registrar,
  verificar2FA,
  passwordless,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
} from "../controllers/usuarioController.js";

import checkAuth from "../middleware/checkAuth.js";

// Autenticación, Registro y Confirmación de Usuarios
router.post("/", registrar); // Crea un nuevo usuario
router.post("/session", autenticar);
router.post("/session/passwordless", passwordless);
router.post("/2fa-verify/:userId", verificar2FA);
router.get("/confirmar/:token", confirmar);
router.post("/olvide-password", olvidePassword);
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);
router.get("/perfil", checkAuth, perfil);

export default router;
