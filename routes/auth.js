const router = require('express').Router()
const User = require('../model/User')
const { registerValidation, loginValidation } = require('../validation')
const bcrypt = require('bcrypt')

router.get('/users', (req, res) => {
    res.json("Hello world")
})

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
        res.send(saveUser)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

// router.post('/login', async (req, res) => {
//     // const user = users.find(user => user.name === req.body.name)
//     // if (user == null) {
//     //     return res.status(400).send("Cannot find user")
//     // }
//     // try {
//     //     if (await bcrypt.compare(req.body.password, user.password)) {
//     //         res.send("Success")
//     //     }
//     //     else {
//     //         res.send("Not allowed")
//     //     }
//     // }
//     // catch {
//     //     res.status(500).send("Something went wrong!")
//     // }
//     res.status(200).send("Working fine!")
// })
module.exports = router