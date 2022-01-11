const router = require('express').Router()
const verify = require('./verifyToken')

router.get('/', verify, (req, res) => {
    res.json({
        models: {
            title: "Blender is cool",
            image: "https://cdn.dribbble.com/users/2624832/screenshots/15457526/media/e155407d8d3f0b64c0be314aa7ac8cc6.png"
        }
    })
})

module.exports = router