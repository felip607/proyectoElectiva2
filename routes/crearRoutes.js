import express from 'express';
import { mostrarCrearProducto, crearProducto } from '../controllers/crearController.js';

const router = express.Router();

router.get('/productos/crear', mostrarCrearProducto);
router.post('/productos/crear', crearProducto);

export default router;