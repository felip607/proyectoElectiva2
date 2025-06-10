import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const usuarioSchema = new mongoose.Schema({
  correo: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  password: { type: String, required: true }
});

// Método para comparar contraseñas
usuarioSchema.methods.validarPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.models.Usuario || mongoose.model('Usuario', usuarioSchema);
