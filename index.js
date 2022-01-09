const express = require('express')
const app = express()
const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config()

// Connect database
mongoose.connect( process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log("Connected to db!"));

// Import Routes
const authRoute = require('./routes/auth')

// Route middleware
app.use('/api/user', authRoute, express.json())

app.listen(3000, () => console.log("Server up and running"))