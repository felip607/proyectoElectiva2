import Usuario from '../models/Usuario.js';
import bcrypt from 'bcrypt';

export const mostrarRegistro = (req, res) => {
  res.render('registro', { error: null });
};

export const procesarRegistro = async (req, res) => {
  const { correo, nombre, password } = req.body;
  try {
    if (!correo || !nombre || !password) {
      return res.render('registro', { error: 'Todos los campos son obligatorios' });
    }
    const existe = await Usuario.findOne({ correo });
    if (existe) {
      return res.render('registro', { error: 'El correo ya está registrado' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const usuario = new Usuario({ correo, nombre, password: passwordHash });
    await usuario.save();
    res.redirect('/login');
  } catch (err) {
    res.render('registro', { error: 'Error al registrar usuario' });
  }
};