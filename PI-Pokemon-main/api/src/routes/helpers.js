
const { get_all_poke , get_one_poke } = require('./controlers');
const { Pokemon, Type } = require('../db.js');


const get_Db = async () => {

    const db = await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['Nombre'],
            through: {
                attributes: [],
            },
        }
    })

    return db
};


const getDbName = async(name)=>{

    const dbName = await Pokemon.findOne({
        where:{
        Nombre: name
        },
        include: {
            model: Type,
            attributes: ['Nombre'],
            through: {
                attributes: [],
            },
        }
    })

    return dbName
};



const all_pokemon = async () => {

    let allPoke = await get_all_poke()
    let pokemon_api = allPoke.map(e => e.value);
    let pokemon_Db = await get_Db();
    let pokemon_total = [...pokemon_api, ...pokemon_Db]
    return pokemon_total;
};


const total_poke = async (req, res) => {
    const { name } = req.query;

    if (!name) {
        let allPoke = await all_pokemon();
        return res.send(allPoke) 
    
    } else {

        let db_name = await getDbName(name)
        let pokeByQuery = await get_one_poke(name);

        db_name ?  res.send(db_name) 
        :  pokeByQuery ?  res.send(pokeByQuery) 
        : (!db_name && !pokeByQuery) ? res.status(404).send('no se encontro pokemon') 
        : null
    }
}



module.exports = {

    get_Db,
    all_pokemon,
    total_poke

};