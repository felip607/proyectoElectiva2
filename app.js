import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import session from 'express-session';

import { obtenerProductos } from './controllers/productoController.js';
import { mostrarLogin, procesarLogin } from './controllers/authController.js';
import carritoRoutes from './routes/carritoRoutes.js';

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
app.use(bodyParser.json()); // Por si acaso se envía JSON
app.use(session({
  secret: 'secreto123',
  resave: false,
  saveUninitialized: false
}));

// 🔌 Conexión a MongoDB
mongoose.connect('mongodb+srv://leidy_01:leidyUPTC@cluster0.g33x988.mongodb.net/ProyectoHyH?retryWrites=true&w=majority')
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error conectando a MongoDB', err));

// 🌐 Rutas
app.get('/', (req, res) => res.redirect('/login'));

app.get('/login', mostrarLogin);
app.post('/login', procesarLogin);

app.get('/productos', (req, res) => {
  if (req.session.usuario) {
    const mensaje = req.session.mensaje;
    delete req.session.mensaje; // Eliminar después de usarlo
    return obtenerProductos(req, res, mensaje);
  } else {
    return res.redirect('/login');
  }
});

// 🛒 Rutas del carrito
app.use('/carrito', carritoRoutes);

// 🚀 Iniciar el servidor
app.listen(3000, () => {
  console.log('🚀 Servidor corriendo en http://localhost:3000');
});
app.use(bodyParser.urlencoded({ extended: true }));

