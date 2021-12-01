import validator from 'express-validator';
const { check, validationResult } = validator; // for validating input parameters

const userValidationRules = () => {
  return [
    check('username', 'Username is required - minimum length: 5.').isLength({
      min: 5
    }),
    check(
      'username',
      'Username contains non-alpha numeric characters - not allowed.'
    ).isAlphanumeric(),
    check('password', 'Passowrd is required.')
      .not()
      .isEmpty(),
    check('email', 'E-mail does not appear to be valid').isEmail(),
    check('birthdate', 'Date of Birth must be a valid date.')
      .isDate()
      .optional({ nullable: true })
  ];
};

const userUpdateValidationRules = () => {
  return [
    check('username', 'Username is required - minimum length: 5.').isLength({
      min: 5
    }),
    check(
      'username',
      'Username contains non-alpha numeric characters - not allowed.'
    ).isAlphanumeric(),
    check('password', 'Passowrd is required.')
      .not()
      .isEmpty()
      .optional({ nullable: true }), // checks only if this argument has value
    check('email', 'E-mail does not appear to be valid')
      .isEmail()
      .optional({ nullable: true }),
    check('birthdate', 'Date of Birth must be a valid date.')
      .isDate()
      .optional({ nullable: true })
  ];
};

const validate = (req, res, next) => {
  // check validationResult obj for any errors
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  return next();
};

export { userValidationRules, userUpdateValidationRules, validate };
