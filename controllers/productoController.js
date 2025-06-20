import Producto from '../models/Producto.js';

// Obtener y mostrar productos
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

// Si necesitas agregar aquí los controladores de creación, puedes hacerlo así:
export const mostrarCrearProducto = (req, res) => {
  res.render('crearProducto', { error: null, mensaje: null });
};

export const crearProducto = async (req, res) => {
  const { nombre, precio, descripcion, imagen } = req.body;
  try {
    await Producto.create({ nombre, precio, descripcion, imagen });
    res.render('crearProducto', { mensaje: 'Producto creado exitosamente', error: null });
  } catch (err) {
    res.render('crearProducto', { error: 'Error al crear producto', mensaje: null });
  }
};
