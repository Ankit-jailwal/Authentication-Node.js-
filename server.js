const express = require('express')
const app = express()

app.use(express.json())

const users = [{name:"TestUser"}]

app.get('/users',(req,res) =>{
    res.json(users)
})

app.post('/users',(req,res)=>{
    const user = { 
        name: req.body.name, 
        password:req.body.password 
    }
    users.push(user)
    res.status(200).send("User was created")
})
app.listen(3000)