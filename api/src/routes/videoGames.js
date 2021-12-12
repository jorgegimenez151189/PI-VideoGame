const express = require('express')
const router = express.Router()
const videoGamesController = require('../controllers/videoGamesController')

router.get(
    "/videogames",
    videoGamesController.getVideoGames
)

router.get(
    "/videogames/detalle/:idVideogame",
    videoGamesController.getVideoGameDetalle
)

router.get(
    "/videogames/:idVideogame",
    videoGamesController.getVideoGameDetalleId
)

router.post(
    "/videogame",
    videoGamesController.createVideoGame
)

module.exports = router