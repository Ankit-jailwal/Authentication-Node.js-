const router = require('express').Router()
const User = require('../model/User')
const { registerValidation, loginValidation } = require('../validation')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {

    // Validation
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    // Checking if email already exists
    const emailExist = await User.findOne({email:req.body.email})
    if(emailExist) return res.status(400).send("Email already exists!")

    // Hashing password
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(req.body.password,salt)

    // Create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try {
        const saveUser = await user.save()
        res.send({user: user._id})
    }
    catch (err) {
        res.status(400).send(err)
    }
})

router.post('/login', async (req, res) => {
    // Checking if email already exists
    const user = await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send("Email does not exist!")

    try {
        // Checking if password is correct
        if (await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
            res.header('auth-token', token).send({'auth-token':token}) 
        }
        else {
            res.status(400).send("Password is incorrect")
        }
    }
    catch(err) {
        res.status(500).send(err)
    }
})
module.exports = router