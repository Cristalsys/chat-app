const {Router} = require('express')
const router = Router()
const {check} = require('express-validator')

const
    {
        signup,
        signin,
        googleLogin
    } = require('../controllers/auth')


// http://localhost:5000/api/auth
router.post('/signup',
    [
        check('email', 'wrong email').isEmail(),
        check('password', 'password min length 4 symbols').isLength({min: 4}),
        check('firstName', 'firstName is empty').not().isEmpty(),
        check('lastName', 'lastName is empty').not().isEmpty(),
        check('avatar', 'avatar is empty').not().isEmpty(),
    ],
    signup)
router.post('/signin',
    [
        check('email', 'enter correct email').isEmail().normalizeEmail(),
        check('password', 'enter correct password').exists(),
    ],
    signin)

router.post('/googleLogin', googleLogin)

module.exports = router