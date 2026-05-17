const express = require('express');
const router  = express.Router();
const pool    = require('../db');
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');

const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename:    (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_')),
});
const upload = multer({ storage });

// GET all products (optional ?collection= filter)
router.get('/', async (req, res) => {
  try {
    const { collection } = req.query;
    let rows;
    if (collection) {
      [rows] = await pool.query('SELECT * FROM products WHERE collection = ? ORDER BY id DESC', [collection]);
    } else {
      [rows] = await pool.query('SELECT * FROM products ORDER BY id DESC');
    }
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// GET single product by id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// POST create product
router.post('/', upload.fields([{ name: 'img_main', maxCount: 1 }, { name: 'img_hover', maxCount: 1 }]), async (req, res) => {
  try {
    const { name, brand, price, category, collection } = req.body;
    const img_main  = req.files?.img_main?.[0]?.filename  || null;
    const img_hover = req.files?.img_hover?.[0]?.filename || null;
    const [result] = await pool.query(
      'INSERT INTO products (name, brand, price, category, collection, img_main, img_hover) VALUES (?,?,?,?,?,?,?)',
      [name, brand, price, category, collection, img_main, img_hover]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// PUT update product
router.put('/:id', upload.fields([{ name: 'img_main', maxCount: 1 }, { name: 'img_hover', maxCount: 1 }]), async (req, res) => {
  try {
    const { name, brand, price, category, collection } = req.body;
    const img_main  = req.files?.img_main?.[0]?.filename  || null;
    const img_hover = req.files?.img_hover?.[0]?.filename || null;

    let query = 'UPDATE products SET name=?, brand=?, price=?, category=?, collection=?';
    const params = [name, brand, price, category, collection];

    if (img_main)  { query += ', img_main=?';  params.push(img_main); }
    if (img_hover) { query += ', img_hover=?'; params.push(img_hover); }
    query += ' WHERE id=?';
    params.push(req.params.id);

    await pool.query(query, params);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// DELETE product
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

module.exports = router;
