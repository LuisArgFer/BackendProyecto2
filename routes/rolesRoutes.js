import express from "express";
const router = express.Router();
import {
  registrarRol,

} from "../controllers/rolesController.js";


router.post("/", registrarRol); // Crea un nuevo Rol

export default router;