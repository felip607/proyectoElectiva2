import express from 'express';
import PDFDocument from 'pdfkit';

const router = express.Router();

// Middleware para asegurar que el carrito exista en la sesión
const asegurarCarrito = (req, res, next) => {
  if (!req.session.carrito) {
    req.session.carrito = [];
  }
  next();
};

// Mostrar carrito
router.get('/', asegurarCarrito, (req, res) => {
  res.render('carrito', {
    carrito: req.session.carrito
  });
});

// Agregar al carrito
router.post('/agregar', asegurarCarrito, (req, res) => {
  const { id, nombre, precio, cantidad } = req.body || {};

  // Validación básica
  if (!id || !nombre || !precio || !cantidad) {
    console.error('❌ Error: Datos incompletos al agregar al carrito:', req.body);
    return res.status(400).send('Faltan datos para agregar al carrito.');
  }

  // Convertir tipos
  const parsedCantidad = parseInt(cantidad);
  const parsedPrecio = parseFloat(precio);

  if (isNaN(parsedCantidad) || isNaN(parsedPrecio)) {
    console.error('❌ Error: Precio o cantidad inválidos');
    return res.status(400).send('Precio o cantidad inválidos.');
  }

  const productoExistente = req.session.carrito.find(p => p.id === id);

  if (productoExistente) {
    productoExistente.cantidad += parsedCantidad;
  } else {
    req.session.carrito.push({
      id,
      nombre,
      precio: parsedPrecio,
      cantidad: parsedCantidad
    });
  }

  // ✅ Guardar mensaje temporal
  req.session.mensaje = `${nombre} agregado al carrito`;

  console.log('✅ Producto agregado al carrito:', req.session.carrito);
  res.redirect('/productos');
});

// Eliminar del carrito
router.post('/eliminar', asegurarCarrito, (req, res) => {
  const { id } = req.body;

  if (!id) {
    console.error('❌ Error: Falta el ID para eliminar del carrito');
    return res.status(400).send('ID de producto requerido para eliminar.');
  }

  req.session.carrito = req.session.carrito.filter(p => p.id !== id);
  console.log('🗑️ Producto eliminado del carrito:', id);
  res.redirect('/carrito');
});

// Pagar y generar PDF
router.get('/pagar', asegurarCarrito, (req, res) => {
  const carrito = req.session.carrito;

  if (!carrito || carrito.length === 0) {
    return res.status(400).send('El carrito está vacío.');
  }

  const doc = new PDFDocument();
  const filename = `factura_${Date.now()}.pdf`;

  res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
  res.setHeader('Content-type', 'application/pdf');

  doc.fontSize(20).text('Factura de Compra', { align: 'center' });
  doc.moveDown();

  let total = 0;
  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    doc.fontSize(14).text(`${item.nombre} x${item.cantidad} - $${subtotal.toFixed(2)}`);
  });

  doc.moveDown();
  doc.fontSize(16).text(`Total: $${total.toFixed(2)}`, { align: 'right' });

  doc.end();
  doc.pipe(res);

  req.session.carrito = []; // Vaciar carrito después del pago
  console.log('🧾 Factura generada y carrito vaciado');
});

export default router;
