import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import rolesRoutes from "./routes/rolesRoutes.js";
import newsourceRoutes from "./routes/newsourceRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

// Configurar CORS
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    console.log(origin)
    if (whitelist.includes(origin)) {
        
      // Puede consultar la API
      callback(null, true);
    } else {
      // No esta permitido
      callback(new Error("Error de Cors"));
    }
  },
};

app.use(cors(corsOptions));
app.use("/api/roles", rolesRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/newsource", newsourceRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/news", newsRoutes);
const PORT = process.env.PORT || 4000;
const servidor = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


import { Server } from "socket.io";

const io = new Server(servidor, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

io.on("connection", (socket) => {
  // console.log("Conectado a socket.io");

  // Definir los eventos de socket io

});
