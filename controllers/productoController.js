import Producto from '../models/Producto.js';

export const obtenerProductos = (req, res, mensaje = null) => {
  // Suponiendo que tienes acceso al modelo de productos
  Producto.find()
    .then(productos => {
      res.render('productos', {
        productos,
        usuario: req.session.usuario,
        mensaje
      });
    })
    .catch(err => {
      console.error('❌ Error al obtener productos:', err);
      res.status(500).send('Error al obtener productos');
    });
};
