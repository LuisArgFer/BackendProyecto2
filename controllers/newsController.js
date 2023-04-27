import News from "../models/News.js";
import Category from "../models/Categories.js";
const obtenerNews = async (req, res) => {
  const { id } = req.params;
  try {
    const news = await News.find({
        $or: [
          { user_id: { $in: id } },
        ],
      });
      res.json(news);
  } catch (e) {
    const error = new Error("Datos no validos");
    return res.status(404).json({ msg: error.message });
  }

};

const filtrarNews = async (req, res) => {
    const userId = req.usuario._id.toString();
    const { id } = req.params;
    const name = {name: id};
    const category = await Category.findOne(name)

    try {
      const news = await News.find({
          $and: [
            { user_id: { $in: userId } },
            { category_id: { $in: category._id } },
          ],
        });
        res.json(news);
    } catch (e) {
      const error = new Error("Datos no validos");
      return res.status(404).json({ msg: error.message });
    }
};



export {
    obtenerNews,
    filtrarNews,
};
