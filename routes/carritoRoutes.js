import express from 'express';
import { mostrarCarrito, agregarAlCarrito, quitarDelCarrito } from '../controllers/carritoController.js';
import { generarFactura } from '../controllers/facturaController.js';

const router = express.Router();

// Mostrar carrito
router.get('/', mostrarCarrito);

// Agregar al carrito
router.post('/agregar', agregarAlCarrito);

// Eliminar del carrito
router.post('/eliminar', quitarDelCarrito);

// Generar factura (PDF)
router.get('/factura', generarFactura);

export default router;
