import Producto from '../models/Producto.js';

export const obtenerProductos = (req, res, mensaje = null) => {
  Producto.find()
    .then(productos => {
      res.render('productos', {
        productos,
        usuario: req.session.usuario ? req.session.usuario.nombre : '',
        mensaje
      });
    })
    .catch(err => {
      console.error('❌ Error al obtener productos:', err);
      res.status(500).send('Error al obtener productos');
    });
};
