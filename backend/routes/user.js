const router = require('express').Router();
const auth = require('../controllers/AuthController');

router.post('/register', auth.register);
router.post('/confirm', auth.confirmRegister);

module.exports = router;
