const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
  usuarioId: String,
  productos: [
    {
      productoId: mongoose.Schema.Types.ObjectId,
      cantidad: Number
    }
  ]
});

module.exports = mongoose.model('Carrito', carritoSchema);
