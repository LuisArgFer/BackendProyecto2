import express from "express";
const router = express.Router();
import {
    obtenerNews,
    filtrarNews,
} from "../controllers/newsController.js";

import checkAuth from "../middleware/checkAuth.js";

// Autenticación, Registro y Confirmación de Usuarios

router
.route("/:id")
.get(checkAuth, obtenerNews);

router
.route("/categoria/:id")
.get(checkAuth, filtrarNews);

export default router;
