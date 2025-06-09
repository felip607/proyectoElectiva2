import express from 'express';
import { obtenerProductos } from '../controllers/productoController.js';

const router = express.Router();

router.get('/productos', obtenerProductos);

export default router;
