import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rutaUsuarios = path.join(__dirname, '../data/usuarios.json');

export const mostrarLogin = (req, res) => {
  res.render('login', { error: null });
};

export const procesarLogin = (req, res) => {
  const { correo, contraseña } = req.body;

  fs.readFile(rutaUsuarios, 'utf-8', (err, data) => {
    if (err) {
      console.error('❌ Error al leer usuarios.json:', err);
      return res.status(500).send('Error interno del servidor');
    }

    let usuarios;
    try {
      usuarios = JSON.parse(data);
    } catch (parseErr) {
      console.error('❌ Error al parsear usuarios.json:', parseErr);
      return res.status(500).send('Error en los datos de usuario');
    }

    const usuarioEncontrado = usuarios.find(u => u.correo === correo && u.contraseña === contraseña);

    if (usuarioEncontrado) {
      req.session.usuario = usuarioEncontrado.correo;
      req.session.mensaje = '¡Bienvenido!';
      console.log('✅ Sesión iniciada para:', req.session.usuario);
      return res.redirect('/productos');
    } else {
      console.warn('🚫 Credenciales inválidas:', correo);
      res.render('login', { error: 'Correo o contraseña incorrectos' });
    }
  });
};
