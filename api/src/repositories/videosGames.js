const {Videogame} = require('../db')

const getAll = async () => {
    //console.log("Lllego sanito");
    try {
        const result = await Videogame.findAll({
            atributes: 
                ['id', 'name']
        });
        //console.log("result:", result);
        return result;
    } catch (error) {
        console.log(error.message)
    }
}

const save = async (propiedades) => {
    try {
        const result = await Videogame.create({
            name: propiedades.nombre,
            descripcion: propiedades.descripcion,
            fecha_lanzamiento: propiedades.fecha_lanzamiento,
            rating: propiedades.rating,
            plataforma: propiedades.plataforma
        });
        return result;
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = {
    getAll,
    save,
}