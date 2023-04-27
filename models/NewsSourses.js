import mongoose from "mongoose";

const newsSoursesSchema = mongoose.Schema(
    {
      url: {
        type: String,
        required: true,
        trim: true,
      },
      name: {
        type: String,
        required: true,
        trim: true,
      },
      category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
      },
      user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
      },
    },
    {
      timestamps: true,
    }
  );

const NewsSourses = mongoose.model("NewsSourses", newsSoursesSchema);
export default NewsSourses;