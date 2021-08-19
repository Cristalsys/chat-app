const Conversation = require('../models/Conversation')

const createConversation = async (req, res) => {
    try {
        const newConversation = new Conversation({
            members: [req.body.sender, req.body.receiver]
        })

        const savedConversation = await newConversation.save()
        res.status(200).json(savedConversation)

    } catch (e) {
        console.log(e.code)
        res.status(500).json({message: 'something is wrong'})
    }
}

const getConversationUser = async (req, res) => {
    try {
        let conversation = await Conversation.find({
            members: {$in: [req.params.userId]}
        })

       res.status(200).json(conversation)
    } catch (e) {
        console.log(e.code)
        res.status(500).json({message: 'something is wrong'})
    }
}

const findConversation = async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            members: {$all: [req.params.firstUserId, req.params.secondUserId]},
        });
        res.status(200).json(conversation)
    } catch (e) {
        console.log(e.code)
        res.status(500).json({message: 'something is wrong'})
    }
}

module.exports =
    {
        createConversation,
        getConversationUser,
        findConversation
    }