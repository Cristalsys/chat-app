const {Router} = require('express')
const auth = require("../middlewares/auth.middleware");
const router = Router()


const
    {
        createConversation,
        getConversationUser,
        findConversation
    } = require('../controllers/conversation')


// http://localhost:5000/api/conversation
router.post('/', auth, createConversation)
router.get('/:userId', auth, getConversationUser)
router.get('/find/:firstUserId/:secondUserId', auth, findConversation)

module.exports = router