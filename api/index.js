//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Videogame, Genero } = require('./src/db.js');
const generosController = require('./src/controllers/generosController')

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    
    generosController.createGenres();
    /* var couter = Videogame.create({
      name: "Counter Strike",
      descripcion: "Juego de tiros entre CT y Terroristas",
      fecha_lanzamiento: "2016-06-21",
      rating: "5",
      plataforma: "PC",
    });

    var warzone = Videogame.create({
      name: "Warzone1",
      descripcion: "Battle royal",
      fecha_lanzamiento: "2016-06-21",
      rating: "10",
      plataforma: "PC - PS4 - PS5"
    });

    var guerra = Genero.create({
      name: "Guerra"
    }) */

    //couter.addGenero(guerra)

    /* Promise.all([couter, warzone, guerra])
    .then(res => {
      console.log("Juegos precargados");
    }); */

  });
});
