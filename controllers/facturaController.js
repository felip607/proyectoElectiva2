import PDFDocument from 'pdfkit';
import path from 'path';

// Función para generar la factura
export const generarFactura = (req, res) => {
  const carrito = req.session.carrito || [];
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  // Crear el documento PDF
  const doc = new PDFDocument();
  
  // Aseguramos la cabecera correcta para el tipo de contenido
  res.setHeader('Content-disposition', 'inline; filename="factura.pdf"');
  res.setHeader('Content-type', 'application/pdf');
  doc.pipe(res);

  // Usamos la fuente 'Helvetica' que maneja UTF-8
  doc.font('Helvetica'); // Helvetica soporta UTF-8 por defecto

  // Título de la factura
  doc.fontSize(20).text('Factura de compra', { align: 'center' });
  doc.moveDown(1);

  // Encabezados de la tabla de productos
  doc.fontSize(12).text('Producto', { continued: true }).text('Precio', { align: 'right', continued: true });
  doc.text('Cantidad', { align: 'right' });
  doc.moveDown(0.5);

  // Línea de separación
  doc.lineWidth(0.5).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(1);

  // Imprimir productos del carrito
  carrito.forEach(p => {
    doc.fontSize(12)
      .text(p.nombre, { continued: true }) // Producto
      .text(`$${p.precio.toFixed(2)}`, { align: 'right', continued: true }) // Precio
      .text(`${p.cantidad} x $${(p.precio * p.cantidad).toFixed(2)}`, { align: 'right' }); // Cantidad y total por producto
  });

  doc.moveDown(1);

  // Línea de separación
  doc.lineWidth(0.5).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(1);

  // Total de la factura
  doc.fontSize(14).text(`Total: $${total.toFixed(2)}`, { align: 'right' });

  // Finalizar el documento
  doc.end();

  // Vaciar el carrito
  req.session.carrito = [];
};
