import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import session from 'express-session';
import dotenv from 'dotenv';

import { obtenerProductos } from './controllers/productoController.js';
import { mostrarLogin, procesarLogin } from './controllers/authController.js';
import { mostrarRegistro, procesarRegistro } from './controllers/RegistroController.js';
import carritoRoutes from './routes/carritoRoutes.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔧 Configuración de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 🖼️ Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// 🧩 Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'secreto123',
  resave: false,
  saveUninitialized: false
}));

// 🔌 Conexión a MongoDB usando variable de entorno
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error conectando a MongoDB', err));

// 🌐 Rutas principales
app.get('/', (req, res) => res.redirect('/login'));

app.get('/login', mostrarLogin);
app.post('/login', procesarLogin);

app.get('/registro', mostrarRegistro);
app.post('/registro', procesarRegistro);

app.get('/productos', (req, res) => {
  if (req.session.usuario) {
    const mensaje = req.session.mensaje;
    delete req.session.mensaje;
    return obtenerProductos(req, res, mensaje);
  } else {
    return res.redirect('/login');
  }
});

// 🛒 Rutas del carrito
app.use('/carrito', carritoRoutes);

// 🔒 Cerrar sesión (GET y POST)
app.get('/logout', (req, res) => {
  console.log('GET /logout ejecutado');
  req.session.destroy(() => {
    res.redirect('/login');
  });
});
app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// (Opcional) Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).send('Página no encontrada');
});

// 🚀 Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

