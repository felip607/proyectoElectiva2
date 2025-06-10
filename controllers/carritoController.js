import Carrito from '../models/Carrito.js';
import Producto from '../models/Producto.js';

export const mostrarCarrito = async (req, res) => {
  const usuarioId = req.session.usuario.id;
  let carrito = await Carrito.findOne({ usuario: usuarioId }).populate('items.producto');
  if (!carrito) carrito = { items: [] };
  const total = carrito.items.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);
  res.render('carrito', { carrito: carrito.items, total });
};

export const agregarAlCarrito = async (req, res) => {
  const usuarioId = req.session.usuario.id;
  const { id, cantidad } = req.body;
  const producto = await Producto.findById(id);
  if (!producto) return res.status(404).send('Producto no encontrado');

  let carrito = await Carrito.findOne({ usuario: usuarioId });
  if (!carrito) carrito = new Carrito({ usuario: usuarioId, items: [] });

  const idx = carrito.items.findIndex(item => item.producto.equals(id));
  if (idx >= 0) {
    carrito.items[idx].cantidad += parseInt(cantidad);
  } else {
    carrito.items.push({ producto: id, cantidad: parseInt(cantidad) });
  }
  await carrito.save();
  req.session.mensaje = `${producto.nombre} agregado al carrito`;
  res.redirect('/productos');
};

export const quitarDelCarrito = async (req, res) => {
  const usuarioId = req.session.usuario.id;
  const { id } = req.body;
  let carrito = await Carrito.findOne({ usuario: usuarioId });
  if (carrito) {
    carrito.items = carrito.items.filter(item => !item.producto.equals(id));
    await carrito.save();
  }
  res.redirect('/carrito');
};