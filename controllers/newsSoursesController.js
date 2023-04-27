import Parser from "rss-parser";
import NewsSourses from "../models/NewsSourses.js";
import News from "../models/News.js";

const obtenerNewsSourse = async (req, res) => {
  const newsSourses = await NewsSourses.find({
    $or: [{ user_id: { $in: req.usuario._id.toString() } }],
  });
  res.json(newsSourses);
};
const obtenerNewSourse = async (req, res) => {
  const { id } = req.params;
  const newsSourses = await NewsSourses.findById(id);
  if (!newsSourses) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }
  if (newsSourses.user_id.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción No Válida");
    return res.status(401).json({ msg: error.message });
  }
  res.json(newsSourses);
};
const nuevoNewsSourse = async (req, res) => {
  const newsSourses = new NewsSourses(req.body);
  newsSourses.user_id = req.usuario._id.toString();

  try {
    const newsSoursesAlmacenado = await newsSourses.save();
    res.json(newsSoursesAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const editarNewsSourses = async (req, res) => {
  const { id } = req.params;

  const newsSourses = await NewsSourses.findById(id);
  const news = await News.deleteMany({
    $and: [{ user_id: { $in: req.usuario._id.toString() } },
      { news_sourse_id: { $in: id } }],
  })
  if (!newsSourses) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (newsSourses.user_id.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción No Válida");
    return res.status(401).json({ msg: error.message });
  }

  newsSourses.url = req.body.url || newsSourses.url;
  newsSourses.name = req.body.name || newsSourses.name;
  newsSourses.category_id = req.body.category_id || newsSourses.category_id;

  try {
    const newsSoursesAlmacenado = await newsSourses.save();
    res.json(newsSoursesAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const eliminarNewsSourses = async (req, res) => {
  const { id } = req.params;

  const newsSourses = await NewsSourses.findById(id);
  const news = await News.deleteMany({
    $and: [{ user_id: { $in: req.usuario._id.toString() } },
      { news_sourse_id: { $in: id } }],
  })
  if (!newsSourses) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (newsSourses.user_id.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción No Válida");
    return res.status(401).json({ msg: error.message });
  }

  try {
    await newsSourses.deleteOne();
    res.status(204).json({ msg: "NewsSourses Eliminado" });
  } catch (error) {
    console.log(error);
  }
};

const insertNews = async (req, res) => {
  const { id } = req.params;
  const newsSourses = await NewsSourses.findById(id);
  const parser = new Parser();
  const feedUrl = newsSourses.url;
  try {
    const feed = await parser.parseURL(feedUrl);

    for (const item of feed.items) {
      const title = item.title;
      const description = item.contentSnippet;
      const publicationDate = new Date(item.isoDate);
      const link = item.link;

      const newsItem = new News({
        title: title,
        short_description: description,
        permantlink: link,
        date: publicationDate,
        news_sourse_id: newsSourses._id,
        user_id: req.usuario._id,
        category_id: req.body.category_id,
      });
      const newAlmacenado = await newsItem.save();
    }
    return res.status(201).json({ msg: "Se almaceno la informacion" });
  } catch (error) {
    console.log(error);
  }
};

export {
  nuevoNewsSourse,
  obtenerNewsSourse,
  obtenerNewSourse,
  editarNewsSourses,
  eliminarNewsSourses,
  insertNews,
};
