const Message = require('../models/Message')

const addMessage = async (req, res) => {
    try {

        const newMessage = new Message({
            conversation: req.body.conversation,
            sender: req.body.sender,
            text: req.body.text
        })

        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);

    } catch (e) {
        console.log(e.code)
        res.status(500).json({message: 'something is wrong'})
    }
}

const getMessages = async (req, res) => {
    try {

        const messages = await Message.find({
            conversation: req.params.conversationId
        })
        res.status(200).json(messages)
    } catch (e) {
        console.log(e.code)
        res.status(500).json({message: 'something is wrong'})
    }
}


module.exports =
    {
        addMessage,
        getMessages
    }