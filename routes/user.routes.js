const {Router} = require('express')
const router = Router()
const auth = require('../middlewares/auth.middleware')


const
    {
        getAuthenticatedUser,
        getUsers,
        getUser
    } = require('../controllers/user')


// http://localhost:5000/api/user
router.get('/me', auth, getAuthenticatedUser)
router.get('/', auth, getUsers)
router.get('/:userId', auth, getUser)

module.exports = router