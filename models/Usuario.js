import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    role_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Roles'
    },
    token: {
      type: String,
    },
    confirmado: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

usuarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password);
};

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;
