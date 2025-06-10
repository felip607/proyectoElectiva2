import mongoose from 'mongoose';
import Usuario from '../models/Usuario.js';
import bcrypt from 'bcrypt';

// Usa tu cadena de conexión de Atlas
mongoose.connect('mongodb+srv://feliprod:c1052414370@cluster0.fldoxuu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

async function crearUsuario() {
  const passwordHash = await bcrypt.hash('123456', 10);
  const usuario = new Usuario({
    correo: 'admin@email.com',
    nombre: 'admin',
    password: passwordHash
  });
  await usuario.save();
  console.log('Usuario creado');
  mongoose.disconnect();
}

crearUsuario();