import PDFDocument from 'pdfkit';
import Carrito from '../models/Carrito.js';

// Función para generar la factura desde el carrito persistente
export const generarFactura = async (req, res) => {
  const usuarioId = req.session.usuario.id;
  const carrito = await Carrito.findOne({ usuario: usuarioId }).populate('items.producto');
  if (!carrito || carrito.items.length === 0) {
    return res.redirect('/carrito');
  }

  // Prepara los datos para la factura
  const items = carrito.items.map(item => ({
    nombre: item.producto.nombre,
    precio: item.producto.precio,
    cantidad: item.cantidad
  }));
  const total = items.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  // Crear el documento PDF
  const doc = new PDFDocument();
  res.setHeader('Content-disposition', 'inline; filename="factura.pdf"');
  res.setHeader('Content-type', 'application/pdf');
  doc.pipe(res);

  doc.font('Helvetica');
  doc.fontSize(20).text('Factura de compra Decoraciones HyH', { align: 'center' });
  doc.moveDown(1);

  // Encabezados de columna
  const startY = doc.y;
  doc.fontSize(12)
    .text('Producto', 60, startY)
    .text('Precio', 260, startY)
    .text('Cantidad', 360, startY)
    .text('Subtotal', 460, startY);
  doc.moveDown(0.5);

  doc.lineWidth(0.5).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(0.5);

  // Imprimir productos del carrito
  let y = doc.y;
  items.forEach(p => {
    doc.fontSize(12)
      .text(p.nombre, 60, y)
      .text(`$${p.precio.toFixed(2)}`, 260, y)
      .text(`${p.cantidad}`, 360, y)
      .text(`$${(p.precio * p.cantidad).toFixed(2)}`, 460, y);
    y += 20;
  });

  doc.moveDown(2);
  doc.lineWidth(0.5).moveTo(50, y).lineTo(550, y).stroke();
  doc.moveDown(1);

  doc.fontSize(14).text(`Total: $${total.toFixed(2)}`, 400, doc.y, { align: 'right' });

  doc.end();

  // Vacía el carrito en la base de datos
  carrito.items = [];
  await carrito.save();
};
