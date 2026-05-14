const router  = require('express').Router();
const multer  = require('multer');
const path    = require('path');
const db      = require('../db');
const { requireAdmin } = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../../uploads')),
  filename:    (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// GET /api/products?collection=X&brand=Y&min_price=N&max_price=N&sort=price_asc
router.get('/', async (req, res) => {
  try {
    const { collection, brand, min_price, max_price, sort } = req.query;
    let sql = 'SELECT * FROM products WHERE 1=1';
    const vals = [];
    if (collection) { sql += ' AND collection = ?'; vals.push(collection); }
    if (brand)      { sql += ' AND brand = ?';      vals.push(brand); }
    if (min_price)  { sql += ' AND price >= ?';     vals.push(Number(min_price)); }
    if (max_price)  { sql += ' AND price <= ?';     vals.push(Number(max_price)); }
    const allowed = { price_asc:'price ASC', price_desc:'price DESC', name_asc:'name ASC', name_desc:'name DESC' };
    if (sort && allowed[sort]) sql += ` ORDER BY ${allowed[sort]}`;
    else sql += ' ORDER BY created_at DESC';
    const [rows] = await db.query(sql, vals);
    res.json(rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/', requireAdmin, upload.fields([{ name: 'img_main', maxCount: 1 }, { name: 'img_hover', maxCount: 1 }]), async (req, res) => {
  try {
    const { name, brand, price, category, collection } = req.body;
    const img_main  = req.files?.img_main?.[0]?.filename  || null;
    const img_hover = req.files?.img_hover?.[0]?.filename || null;
    const [result] = await db.query(
      'INSERT INTO products (name, brand, price, category, collection, img_main, img_hover) VALUES (?,?,?,?,?,?,?)',
      [name, brand, Number(price), category, collection, img_main, img_hover]
    );
    res.status(201).json({ id: result.insertId });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/:id', requireAdmin, upload.fields([{ name: 'img_main', maxCount: 1 }, { name: 'img_hover', maxCount: 1 }]), async (req, res) => {
  try {
    const { name, brand, price, category, collection } = req.body;
    const fields = { name, brand, price: Number(price), category, collection };
    if (req.files?.img_main?.[0])  fields.img_main  = req.files.img_main[0].filename;
    if (req.files?.img_hover?.[0]) fields.img_hover = req.files.img_hover[0].filename;
    const setClauses = Object.keys(fields).map(k => `${k} = ?`).join(', ');
    await db.query(`UPDATE products SET ${setClauses} WHERE id = ?`, [...Object.values(fields), req.params.id]);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
