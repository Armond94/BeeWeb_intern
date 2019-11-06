const express = require('express');
const router = express.Router();
// const { ensureAuthenticated } = require('../configs/auth');

// Welcome Page
router.get('/', (req, res) => res.render('welcome'));

// Dashboard

module.exports = router;
