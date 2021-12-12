const {Genero} = require('../db')

const getAll = async () => {
    try {
        const result = await Genero.findAll({
            atributes: 
                ['id', 'name']
        });
       
        return result;
    } catch (error) {
        console.log(error.message)
    }
}

const save = async (propiedades) => {
    try {
        
        for (let i = 0; i < propiedades.length; i++) {
            await Genero.create({
                name: propiedades[i].name
            })
        }
    } catch (error) {
        console.error(error.message)
    }
}

module.exports = {
    getAll,
    save,
  }