import Roles from "../models/Roles.js";

const registrarRol = async (req, res) => {
  // Evitar registros duplicados
  const { name } = req.body;
  const existeRol = await Roles.findOne({ name });

  if (existeRol) {
    const error = new Error("Roles ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const roles = new Roles(req.body);
    await roles.save();

    res.status(201).json({
      msg: "Roles Creado Correctamente",
    });
  } catch (error) {
    console.log(error);
  }
};



export {
  registrarRol,
};
