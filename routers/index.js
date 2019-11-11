import express from 'express';
const router = express.Router();

// Welcome Page
router.get('/', (req, res) => res.render('welcome'));

module.exports = router;
