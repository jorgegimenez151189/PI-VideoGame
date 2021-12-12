const { Router } = require('express');
const videoGames = require('./videoGames');
const genero = require('./genero');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use("/", videoGames)
router.use("/", genero)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
