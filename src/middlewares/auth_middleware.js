import jwt from 'jsonwebtoken';

export const verificar_token = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.redirect('/');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.redirect('/');
  }
};