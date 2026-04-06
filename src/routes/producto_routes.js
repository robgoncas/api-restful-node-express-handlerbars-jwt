import { Router } from 'express';
import {
  obtener_productos,
  crear_producto,
  borrar_producto
} from '../controllers/producto_controller.js';

const router = Router();

router.get('/', obtener_productos);
router.post('/', crear_producto);
router.delete('/:id', borrar_producto);

export default router;
