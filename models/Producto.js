// models/Producto.js
import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  imagen: {
    type: String,
    required: true
  }
});

// Tercer argumento 'HyH' asegura que use esa colección exactamente
export default mongoose.model('Producto', productoSchema, 'HyH');
