require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const express = require('express');
const session = require('express-session');
const path    = require('path');

const productsRouter = require('./routes/products');
const adminRouter    = require('./routes/admin');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret:            process.env.SESSION_SECRET || 'tana-bana-secret',
  resave:            false,
  saveUninitialized: false,
  cookie:            { secure: false, maxAge: 1000 * 60 * 60 * 8 },
}));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/admin',   express.static(path.join(__dirname, '../admin')));
app.use(express.static(path.join(__dirname, '..'))); // serves frontend root

app.use('/api/products', productsRouter);
app.use('/api/admin',    adminRouter);

app.listen(PORT, () => console.log(`Tana Bana → http://localhost:${PORT}`));

app.use('/assets', express.static(path.join(__dirname, '../assets')));