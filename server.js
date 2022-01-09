const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

app.use(express.json())

const users = [{name:"TestUser"}]

app.get('/users',(req,res) =>{
    res.json(users)
})

app.post('/users', async (req,res)=>{
    try{
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        console.log(salt)
        console.log(hashPassword)
        const user = { 
            name: req.body.name, 
            password: hashPassword 
        }
        users.push(user)
        res.status(200).send("User was created")
    }
    catch{
        res.status(500).send("Something went wrong!")
    }
})
app.listen(3000)