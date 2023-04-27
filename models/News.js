import mongoose from "mongoose";

const newsSchema = mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      short_description: {
        type: String,
        required: true,
        trim: true,
      },
      permantlink: {
        type: String,
        trim: true,
      },
      date: {
        type: String,
        trim: true,
      },
      news_sourse_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NewsSourses'
      },
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
      },
      category_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
      },
    },
    {
      timestamps: true,
    }
  );

const News = mongoose.model("News", newsSchema);
export default News;