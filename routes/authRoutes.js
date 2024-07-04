const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);

// Example protected route
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ msg: 'Welcome to the protected route', user: req.user });
});

module.exports = router;
