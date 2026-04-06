import {
  get_productos,
  agregar_producto,
  eliminar_producto,
  existe_producto
} from '../models/producto_model.js';

export const obtener_productos = (req, res) => {
  res.status(200).json({
    data: get_productos(),
    links: { self: "/api/productos" }
  });
};

export const crear_producto = (req, res) => {
  const { nombre, precio } = req.body;

  if (!nombre || !precio)
    return res.status(400).json({ error: "faltan campos" });

  if (existe_producto(nombre))
    return res.status(409).json({ error: "producto ya existe" });

  const nuevo = {
    id: Date.now(),
    nombre,
    precio
  };

  agregar_producto(nuevo);

  res.status(201).json({
    data: nuevo,
    links: { self: `/api/productos/${nuevo.id}` }
  });
};

export const borrar_producto = (req, res) => {
  eliminar_producto(req.params.id);
  res.status(204).send();
};
