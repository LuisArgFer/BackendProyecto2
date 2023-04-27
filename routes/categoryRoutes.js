import express from "express";
const router = express.Router();
import {
    obtenerCategories,
    obtenerCategory,
    nuevoCategory,
    editarCategory,
    eliminarCategory,

} from "../controllers/categoryController.js";

import checkAuth from "../middleware/checkAuth.js";

// Autenticación, Registro y Confirmación de Usuarios
router
.route("/")
.get(checkAuth, obtenerCategories) // Crea un nuevo usuario
.post(checkAuth, nuevoCategory);

router
.route("/:id")
.get(checkAuth, obtenerCategory)
.put(checkAuth ,editarCategory)
.delete(checkAuth, eliminarCategory);

export default router;
