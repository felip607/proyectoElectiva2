import express from 'express';
import { login } from '../controllers/authController.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/login', login);

export default router;
