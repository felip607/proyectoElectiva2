import Usuario from '../models/Usuario.js';
import bcrypt from 'bcrypt';

export const mostrarLogin = (req, res) => {
  res.render('login', { error: null });
};

export const procesarLogin = async (req, res) => {
  const { correo, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.render('login', { error: 'Usuario no encontrado' });
    }
    if (!usuario.password || !password) {
      return res.render('login', { error: 'Datos incompletos para autenticación' });
    }
    const esValido = await bcrypt.compare(password, usuario.password);
    if (!esValido) {
      return res.render('login', { error: 'Contraseña incorrecta' });
    }
    req.session.usuario = {
      id: usuario._id,
      nombre: usuario.nombre,
      correo: usuario.correo
    };
    req.session.mensaje = '¡Bienvenido!';
    res.redirect('/productos');
  } catch (err) {
    console.error('❌ Error en el servidor:', err);
    res.render('login', { error: 'Error en el servidor' });
  }
};
