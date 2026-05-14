const router = require('express').Router();
const { requireAdmin } = require('../middleware/auth');

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'changeme';

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    req.session.admin = true;
    return res.json({ success: true });
  }
  res.status(401).json({ error: 'Bad credentials' });
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => res.json({ success: true }));
});

router.get('/me', requireAdmin, (req, res) => {
  res.json({ admin: true });
});

module.exports = router;
