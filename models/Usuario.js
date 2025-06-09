import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  email: String,
  password: String
});

export default mongoose.models.Usuario || mongoose.model('Usuario', usuarioSchema);
