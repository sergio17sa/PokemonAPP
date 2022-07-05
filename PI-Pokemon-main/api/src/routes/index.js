const { Router } = require('express');
const { typesGet,  getById, create_pokemon } = require('../routes/controlers');
const { total_poke} = require('../routes/helpers')


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/pokemons', total_poke);
router.get('/types', typesGet);
router.get('/pokemons/:id', getById)
router.post('/pokemons', create_pokemon)



module.exports = router;
