import mongoose from "mongoose";

const rolesSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
    },
    {
      timestamps: true,
    }
  );

const Roles = mongoose.model("Roles", rolesSchema);
export default Roles;