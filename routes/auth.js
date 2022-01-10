const router = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcrypt')
const Joi = require('@hapi/joi');

// Validation

const schema = Joi.object({
    name: Joi.string()
        .min(3)
        .required()
        .max(255),
    email: Joi.string()
        .min(6)
        .max(255)
        .required()
        .email(),
    password: Joi.string()
        .min(8)
        .max(1024)
        .required(),

})

router.get('/users', (req, res) => {
    res.json("Hello world")
})

router.post('/register', async (req, res) => {

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
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