import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const usuarios = [];

export const vista_login = (req, res) => res.render('login');

export const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "faltan datos" });

  const hash = await bcrypt.hash(password, 10);

  usuarios.push({ email, password: hash });

  res.status(201).json({ mensaje: "usuario creado" });
};

export const login = async (req, res) => {
  const user = usuarios.find(u => u.email === req.body.email);

  if (!user)
    return res.status(404).json({ error: "usuario no existe" });

  const valido = await bcrypt.compare(req.body.password, user.password);

  if (!valido)
    return res.status(401).json({ error: "credenciales invalidas" });

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: false // true en producción (https)
  });

  // redirigir al dashboard
  res.redirect('/dashboard');
};
