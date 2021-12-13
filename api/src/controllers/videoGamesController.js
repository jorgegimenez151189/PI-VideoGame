const repositoryVideosGames = require('../repositories/videosGames')
require('dotenv').config();
const {
    YOUR_API_KEY,
  } = process.env;

const axios = require('axios');
const url = `https://api.rawg.io/api/games?key=${YOUR_API_KEY}`;

const getVideoGames = async (req, res, next) => {
    try {
        const { name } = req.query;
        const urQuery = `https://api.rawg.io/api/games?search=${name}&key=${YOUR_API_KEY}`;
        if (name) { //Pregunta por QUERY
            let addApiQuery = {}
            const apiQuery = 
                await axios.get(urQuery)
            //Convierto de array de objetos a Objetos
            const apiQueryData = Object.assign({}, apiQuery.data.results)

            //Agrego solo los primeros 15 elementos al nuevo Objeto
            for (let i = 0; i < 15; i++) {
                addApiQuery[i] = apiQueryData[i.toString()]
            }
            

            const resp = Object.values(addApiQuery).map( api => 
                ({
                    id: api.id,
                    name: api.name, 
                    imagen: api.background_image, 
                    genero: api.genres.map(genero => genero.name).toString()
                }))
         /*    for (const property in addApiQuery) {
                console.log(property)
            } */

            res.status(200).json(resp);
            next();
        }else{//Devuelve los primeros 60 juegos
            let apiData2 = []
            const apiDatos = [];
        
            let page=2;
            //Trae los Videos Juegos de la API
            const apiData = 
                await axios.get(url)
            
            while (page < 4){
                apiData2 = await axios.get(url+`&page=${page}`)
                apiDatos.push(apiData2.data.results)
                page++;
            } 
            
            //Tomo los datos de la API
            const api = apiData.data.results;
            apiDatos.push(api)
            const apiDataTotal = apiDatos[0].concat(apiDatos[1].concat(apiDatos[2]));
    
            //Extraigo los datos necesarios para enviar
            const resp = apiDataTotal.map( api => 
                ({
                    id: api.id,
                    name: api.name, 
                    imagen: api.background_image, 
                    genero: api.genres.map(genero => genero.name).toString()
                })) 
            
            //Trae los Videos Juegos de la BD
            const repoData = await repositoryVideosGames.getAll();
            const dbData = repoData.map(repoData =>
                ({
                    name: repoData.name,
                }))
            
            const respuesta = {
                ...resp,
                //...dbData,
            } 
            
            //const respuesta = Object.assign(apiData, repoData);

            res.status(200).json(respuesta);
            next();
        }

    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'No pudimos encontrar el dato solicitado'})
    }
}

const getVideoGameDetalle = async (req, res) => {
    try {
        let apiData2 = []
        const apiDatos = [];
    
        let page=2;
        //Trae los Videos Juegos de la API
        const apiData = 
            await axios.get(url)
        
        while (page < 4){
            apiData2 = await axios.get(url+`&page=${page}`)
            apiDatos.push(apiData2.data.results)
            page++;
        } 
        
        //Tomo los datos de la API
        const api = apiData.data.results;
        apiDatos.push(api)
        const apiDataTotal = apiDatos[0].concat(apiDatos[1].concat(apiDatos[2]));

        //Extraigo los datos necesarios para enviar
        const resp = apiDataTotal.map( api => 
            ({
                id: api.id,
                name: api.name, 
                imagen: api.background_image, 
                genero: api.genres.map(genero => genero.name).toString(),
                fecha_lanzamiento: api.released,
                rating: api.rating,
                plataforma: api.platforms.map(plataforma => plataforma.platform.name)
            })) 
        
        //Trae los Videos Juegos de la BD
        const repoData = await repositoryVideosGames.getAll();
        const dbData = repoData.map(repoData =>
            ({
                name: repoData.name,
            }))
        
        let respApi = Object.entries(resp).map(object => object[1])
        const respuesta = {
            ...resp,
            //...dbData,
        } 
        
        //const respuesta = Object.assign(apiData, repoData);

        res.status(200).json(respApi);
        next();  
    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'No pudimos encontrar el dato solicitado'})
        
    }
}

const getVideoGameDetalleId = async (req, res) => {
    try {
        const { idVideogame } = req.params;
        const urlId = `https://api.rawg.io/api/games/${idVideogame}?key=${YOUR_API_KEY}`;
        const apiId = 
                await axios.get(urlId)
        const apiIdData = apiId.data
       const resp =  
            {
                id: apiIdData.id,
                name: apiIdData.name, 
                imagen: apiIdData.background_image, 
                descripcion: apiIdData.description,
                genero: apiIdData.genres.map(genero => genero.name).toString(),
                fecha_lanzamiento: apiIdData.released,
                rating: apiIdData.rating,
                plataforma: apiIdData.platforms.map(plataforma => plataforma.platform.name)
            }
        res.status(200).json(resp);
       
    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: 'No pudimos encontrar el dato solicitado'})
        
    }
}

const createVideoGame = async (req, res) => {
    try {
        const {nombre, descripcion, fecha_lanzamieto, rating, plataforma, id_genero} = req.body;
        const result = await repositoryVideosGames.save({nombre, descripcion, fecha_lanzamieto, rating, plataforma});
        await result.setGeneros(id_genero);

        console.log("Rsultado:", result);

        res.status(201).json({message: 'Video Game creado exitosamente'})
    } catch (error) {
        console.error(error.message);
        res.status(500).json(result);
  }
}

module.exports = {
    getVideoGames,
    getVideoGameDetalle,
    getVideoGameDetalleId,
    createVideoGame,
};