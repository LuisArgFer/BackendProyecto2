import express from "express";
const router = express.Router();
import {
    nuevoNewsSourse,
    obtenerNewsSourse,
    obtenerNewSourse,
    editarNewsSourses,
    eliminarNewsSourses,
    insertNews,
} from "../controllers/newsSoursesController.js";

import checkAuth from "../middleware/checkAuth.js";

// Autenticación, Registro y Confirmación de Usuarios
router
.route("/")
.get(checkAuth, obtenerNewsSourse)// Crea un nuevo usuario
.post(checkAuth, nuevoNewsSourse);

router
.route("/:id")
.get(checkAuth, obtenerNewSourse)
.put(checkAuth, editarNewsSourses)
.delete(checkAuth, eliminarNewsSourses);

router
.route("/:id/process")
.post(checkAuth, insertNews);


export default router;
