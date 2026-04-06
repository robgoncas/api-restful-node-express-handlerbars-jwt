let productos = [];

export const get_productos = () => productos;

export const existe_producto = (nombre) => {
  return productos.find(p => p.nombre === nombre);
};

export const agregar_producto = (producto) => {
  productos.push(producto);
};

export const eliminar_producto = (id) => {
  productos = productos.filter(p => p.id != id);
};
