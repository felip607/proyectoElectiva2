import Producto from '../models/Producto.js';

// Controlador ejemplo (controllers/productoController.js)
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