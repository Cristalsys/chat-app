const config = require('config')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')

const {cloudinary} = require('../utils/cloudinary');


const signup = async (req, res) => {
    try {
        const errors = validationResult(req)


        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'wrong data'
            })
        }

        const uploadResponse = await cloudinary.uploader.upload(req.body.avatar, {
            upload_preset: config.get('upload_preset'),
        });


        const newUser = {
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            avatar: uploadResponse.url
        }

        const candidate = await User.findOne({email: newUser.email})
        if (candidate) {
            return res.status(409).json({message: 'Email is already in use'})
        }


        const hashedPassword = await bcrypt.hash(newUser.password, 12)

        const user = new User({
            email: newUser.email,
            password: hashedPassword,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            avatar: newUser.avatar
        })
        await user.save()

        const token = jwt.sign(
            {userAuth: user},
            config.get('jwtSecret'),
            {expiresIn: '5h'}
        )

        res.json({token})

    } catch (e) {
        console.log(e)
        res.status(500).json({message: e.code})
    }

}

const signin = async (req, res) => {
    try {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'wrong data'
            })
        }

        const auth_user = {
            email: req.body.email,
            password: req.body.password
        }

        const user = await User.findOne({email: auth_user.email})
        if (!user) {
            return res.status(404).json({message: 'Wrong credentials, please try again'})
        }
        let isMatch = await bcrypt.compare(auth_user.password, user.password)
        if (!isMatch) {
            return res.status(404).json({message: 'Wrong credentials, please try again'})
        }

        const token = jwt.sign(
            {userAuth: user},
            config.get('jwtSecret'),
            {expiresIn: '5h'}
        )

        res.status(200).json({token, userId: user.id})

    } catch (e) {
        console.log(e)
        return res
            .status(403)
            .json({message: 'Wrong credentials, please try again'});
    }
}

module.exports =
    {
        signup,
        signin,
    }