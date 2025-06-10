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
  doc.fontSize(20).text('Factura de compra', { align: 'center' });
  doc.moveDown(1);

  doc.fontSize(12).text('Producto', { continued: true }).text('Precio', { align: 'right', continued: true });
  doc.text('Cantidad', { align: 'right' });
  doc.moveDown(0.5);

  doc.lineWidth(0.5).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(1);

  // Imprimir productos del carrito
  items.forEach(p => {
    doc.fontSize(12)
      .text(p.nombre, { continued: true })
      .text(`$${p.precio.toFixed(2)}`, { align: 'right', continued: true })
      .text(`${p.cantidad} x $${(p.precio * p.cantidad).toFixed(2)}`, { align: 'right' });
  });

  doc.moveDown(1);
  doc.lineWidth(0.5).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(1);

  doc.fontSize(14).text(`Total: $${total.toFixed(2)}`, { align: 'right' });

  doc.end();

  // Vacía el carrito en la base de datos
  carrito.items = [];
  await carrito.save();
};
