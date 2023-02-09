const { Router } = require('express');
const { check, query, param } = require('express-validator');

const { validRole, emailExists, userById } = require('../helpers/dbValidators');
const {
  validateFields,
  validateJWT,
  isAdminRole,
  hasRole,
} = require('../middlewares');

const {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers,
} = require('../controllers/user.controller');

const router = Router();

router.get(
  '/',
  [
    query('limit', 'The limit must be a number').isNumeric().optional(),
    query('from', 'The from must be a number').isNumeric().optional(),
  ],
  validateFields,
  getUsers
);
router.post(
  '/',
  [
    check('name', 'The name is required').not().isEmpty(),
    check('password', 'The password is required')
      .not()
      .isEmpty()
      .bail()
      .isLength({ min: 6 })
      .withMessage('The password must have more than 6 characters'),
    check('email', 'Is not a valid email').isEmail().bail().custom(emailExists),
    // check('role', 'Is not a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(validRole),
  ],
  validateFields,
  postUsers
);
router.put(
  '/:id',
  [
    check('id', 'Is not a valid Mongo ID').isMongoId().bail().custom(userById),
    check('role').optional().custom(validRole),
    check('password', 'The password is required')
      .notEmpty()
      .bail()
      .isLength({ min: 6 })
      .withMessage('The password must have more than 6 characters'),
  ],
  validateFields,
  putUsers
);
router.delete(
  '/:id',
  validateJWT,
  // isAdminRole,
  hasRole('ADMIN_ROLE', 'SALES_ROLE'),
  param('id', 'Is not a valid Mongo ID').isMongoId().bail().custom(userById),
  validateFields,
  deleteUsers
);
module.exports = router;
