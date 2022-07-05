const axios = require('axios');
const { Pokemon, Type } = require('../db');
const fortypoke = `?offset=0&limit=10`;
const { v4: uuidv4 } = require('uuid');


const get_all_poke = async (req , res) => {

    try {

        let firstReq = await axios.get(`https://pokeapi.co/api/v2/pokemon/${fortypoke}`)
        let firstRes = firstReq.data.results.map(async (p) => {

            let secondReq = await axios.get(p.url)

            let pokemon = {
                Nombre: secondReq.data.name,
                id: secondReq.data.id,
                Vida: secondReq.data.stats[0].base_stat,
                Fuerza: secondReq.data.stats[1].base_stat,
                Defensa: secondReq.data.stats[2].base_stat,
                Velocidad: secondReq.data.stats[5].base_stat,
                Altura: secondReq.data.height,
                Peso: secondReq.data.weight,
                Image: secondReq.data.sprites.other.dream_world.front_default,
                types: secondReq.data.types.map((p) => {

                    let Nombre = p.type.name;
                    let id = parseInt(p.type.url.split('/')[6]);

                    return { Nombre, id };

                }),
            }
            return pokemon
        })

        return Promise.allSettled(firstRes)

    } catch (error) {
        throw console.log('esta rotoo get all')
    }
};


const get_one_poke = async (name) => {

    try {

        let req_by_name = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
        

        let poke_by_name = {

            Nombre: req_by_name.data.name,
            id: req_by_name.data.id,
            Vida: req_by_name.data.stats[0].base_stat,
            Fuerza: req_by_name.data.stats[1].base_stat,
            Defensa: req_by_name.data.stats[2].base_stat,
            Velocidad: req_by_name.data.stats[5].base_stat,
            Altura: req_by_name.data.height,
            Peso: req_by_name.data.weight,
            Image: req_by_name.data.sprites.other.dream_world.front_default,
            types: req_by_name.data.types.map((p) => {

                let Nombre = p.type.name;
                let id = parseInt(p.type.url.split('/')[6]);

                return { Nombre, id };
            }),
        }
        return poke_by_name;

    } catch (error) {
         console.log(error)
    }
};


const getById = async (req, res) => {

    const { id } = req.params;

    if (Number(id) < 898) {

        const req_by_id = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)

        let poke_by_id = {

            Nombre: req_by_id.data.name,
            id: req_by_id.data.id,
            Vida: req_by_id.data.stats[0].base_stat,
            Fuerza: req_by_id.data.stats[1].base_stat,
            Defensa: req_by_id.data.stats[2].base_stat,
            Velocidad: req_by_id.data.stats[5].base_stat,
            Altura: req_by_id.data.height,
            Peso: req_by_id.data.weight,
            Image: req_by_id.data.sprites.other.dream_world.front_default,
            types: req_by_id.data.types.map((p) => {

                let Nombre = p.type.name;
                let id = parseInt(p.type.url.split('/')[6]);

                return { Nombre, id };
            }),
        }
        console.log(typeof id)
        return res.send(poke_by_id)

    } else if (id.length > 4) {
        console.log(id)

        const pokeId_db = await Pokemon.findAll({
            where: {
                id: id
            },
            include: {
                model: Type,
                attributes: ['Nombre'],
                through: {
                    attributes: [],
                },
            }
        })

        return res.send(pokeId_db)

    };
};


const typesGet = async (req, res) => {

    const get_types = await axios.get(`https://pokeapi.co/api/v2/type`)

    let res_types = get_types.data.results.map(el => el.name);
    let types = res_types.forEach(async el => {
        const create_typeDb = await Type.findOrCreate({
            where: {
                Nombre: el
            }
        });
    });

    const db_allTypes = await Type.findAll()

    return res.send(db_allTypes)

};




const create_pokemon = async (req, res) => {

    const  { Nombre, Vida,Fuerza,Defensa,Velocidad,Altura,createdInDb, Peso,Image,types } = req.body
    
    const create_poke = await Pokemon.create({
        Nombre, 
        Vida, 
        Fuerza, 
        Defensa, 
        Velocidad, 
        Altura, 
        Peso, 
        createdInDb: true,
        Image, 
        id: uuidv4(),
    })
    
    const dbTypes = await Type.findAll({
    
    where: {
    Nombre: types
    }
    
    });
    
    create_poke.addType(dbTypes)
    
    res.send( `Pokemon ${Nombre} Creado Con Exito`)
    
    };



module.exports = {

    typesGet,
    get_all_poke,
    get_one_poke,
    getById,
    create_pokemon,

};