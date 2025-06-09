export const mostrarCarrito = (req, res) => {
  const carrito = req.session.carrito || [];
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  res.render('carrito', { carrito, total });
};

export const agregarAlCarrito = (req, res) => {
  const { id, nombre, precio, cantidad } = req.body;
  const producto = { id, nombre, precio: parseFloat(precio), cantidad: parseInt(cantidad) };

  req.session.carrito = req.session.carrito || [];
  const index = req.session.carrito.findIndex(p => p.id === id);
  if (index >= 0) {
    req.session.carrito[index].cantidad += producto.cantidad;
  } else {
    req.session.carrito.push(producto);

  }

  res.redirect('/productos');
};

export const quitarDelCarrito = (req, res) => {
  const { id } = req.params;
  req.session.carrito = req.session.carrito.filter(p => p.id !== id);
  res.redirect('/carrito');
};