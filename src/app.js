import express from 'express';
import cookieParser from 'cookie-parser';
import { engine } from 'express-handlebars';

import auth_routes from './routes/auth_routes.js';
import producto_routes from './routes/producto_routes.js';
import { verificar_token } from './middlewares/auth_middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use('/', auth_routes);
app.use('/api/productos', producto_routes);

app.get('/dashboard', verificar_token, (req, res) => {
  res.render('dashboard', {
    usuario: req.usuario.email
  });
});

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

export default app;
