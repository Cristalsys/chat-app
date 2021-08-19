const {Router} = require('express')
const auth = require("../middlewares/auth.middleware");
const {getAuthenticatedUser} = require("../controllers/user");
const router = Router()


const
    {
        addMessage,
        getMessages
    } = require('../controllers/message')


// http://localhost:5000/api/conversation
router.post('/', auth, addMessage)
router.get('/:conversationId', auth, getMessages)
module.exports = router