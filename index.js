const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const modelRoute = require('./routes/getModels')
// Import Routes
const authRoute = require('./routes/auth')

dotenv.config()

// Connect database
mongoose.connect( process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log("Connected to db!"))

// Middleware

app.use(express.json())

// Route middleware
app.use('/api/user', authRoute)
app.use('/api/models', modelRoute)

app.listen(4000, () => console.log("Server up and running"))