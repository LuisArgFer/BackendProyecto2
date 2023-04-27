import Category from "../models/Categories.js";

const obtenerCategories = async (req, res) => {
  const category = await Category.find();
  res.json(category);
};
const obtenerCategory = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  const categoria = await Category.findById(id);
  if (!newsSourses) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }
  res.json(categoria);
};
const nuevoCategory = async (req, res) => {
  console.log("Siii")
  const categorie = await Category.findOne({ name: req.body.name});
  if(categorie){
    const error = new Error("Esta categoria esta repetida");
    return res.status(404).json({ msg: error.message });
  }
  const category = new Category(req.body);
  try {
    const categoryAlmacenado = await category.save();
    res.status(201).json(categoryAlmacenado);
  } catch (error) {
    console.log(error);
  }
};


const editarCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);

  if (!category) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  category.name = req.body.name || category.name;

  try {
    const categoryAlmacenado = await category.save();
    res.json(categoryAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const eliminarCategory = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  try {
    await category.deleteOne();
    res.status(404).json({ msg: "Category Eliminado" });
  } catch (error) {
    console.log(error);
  }
};



export {
  obtenerCategories,
  obtenerCategory,
  nuevoCategory,
  editarCategory,
  eliminarCategory,
};
