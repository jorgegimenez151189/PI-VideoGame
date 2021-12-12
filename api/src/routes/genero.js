const express = require('express')
const router = express.Router()
const generosController = require('../controllers/generosController')

router.get(
    "/genres",
    generosController.getGenres
)


module.exports = router