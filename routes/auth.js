const router = require('express').Router();
const bcrypt = require('bcrypt')

const users = [{ name: "TestUser" }]

router.get('/users', (req, res) => {
    res.json(users)
})

router.post('/register', async (req, res) => {
    try {
        // const salt = await bcrypt.genSalt()
        // const hashPassword = await bcrypt.hash(req.body.password, salt)
        // const user = {
        //     name: req.body.name,
        //     password: hashPassword
        // }
        // users.push(user)
        res.status(200).send("User was created")
    }
    catch {
        res.status(500).send("Something went wrong!")
    }
})

router.post('/login', async (req, res) => {
    // const user = users.find(user => user.name === req.body.name)
    // if (user == null) {
    //     return res.status(400).send("Cannot find user")
    // }
    // try {
    //     if (await bcrypt.compare(req.body.password, user.password)) {
    //         res.send("Success")
    //     }
    //     else {
    //         res.send("Not allowed")
    //     }
    // }
    // catch {
    //     res.status(500).send("Something went wrong!")
    // }
    res.status(200).send("Working fine!")
})
module.exports = router