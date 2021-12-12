const repositoryGenres = require('../repositories/generos');
require('dotenv').config();
const {
    YOUR_API_KEY,
  } = process.env;

const axios = require('axios');
//const { json } = require('sequelize/types');
const url = `https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`;

const getGenres = async (req, res) => {
    try {

        /* const apiGenero = 
            await axios.get(url)

        const resp = apiGenero.data.results.map( api => 
            ({
                //id: api.id,
                name: api.name, 
            })) 
        //Envio los datos al repo para poder guardar    
        const createGenres = await repositoryGenres.save(resp) */
        
        //Busco en la BD de generos
        const respDB = await repositoryGenres.getAll();
        const dbData = respDB.map(repoData =>
            ({
                id: repoData.id,
                name: repoData.name,
            }))
        
        res.status(200).json(dbData);
        
    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'No pudimos encontrar el dato solicitado'})
    }
}

const createGenres = async (req, res) => {
    try {
        const apiGenero = 
            await axios.get(url);

        const resp = apiGenero.data.results.map( api => 
            ({
                    //id: api.id,
                name: api.name, 
            })) 
        //Envio los datos al repo para poder guardar    
        const createGenres = await repositoryGenres.save(resp)
    } catch (error) {
        console.error(err.message)
        res.status(500).json({message: 'No pudimos encontrar el dato solicitado'})
    }
    
}
module.exports = {
    getGenres,
    createGenres,
};