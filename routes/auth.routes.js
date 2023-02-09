const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();

router.post(
  '/login',
  [
    check('email', 'Is not a valid email').isEmail(),
    check('password', 'The password is required').notEmpty(),
  ],
  validateFields,
  login
);

module.exports = router;
