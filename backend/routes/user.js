const router = require('express').Router();   
const auth = require('../controllers/AuthController');

router.post('/register', auth.register);
router.post('/confirm', auth.confirmRegister);
router.post('/login', auth.login);
router.post('/validate', auth.validate_token);

module.exports = router;