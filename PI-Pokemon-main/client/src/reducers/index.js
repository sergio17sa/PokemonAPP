import {
    FILTER_BY_TYPE, FILTER_CREATED_API, GET_POKEMON, ORDER_BY_NAME, ORDER_BY_HP,
    SEARCH_BY_NAME, POST_POKEMON, GET_TYPES, GET_BY_ID
} from "../ActionsVariables";



const initialState = { // info de los stados // pasar un estado inical de al app que va a ser un objeto 
    pokemons: [],
    allPokemon: [],
    pokemonTypes: [],
    detail: []
};


function rootReducer(state = initialState, action) { //consultar info root reducer 

    switch (action.type) {

        case GET_POKEMON:
            return {
                ...state,
                pokemons: action.payload,
                allPokemon: action.payload
            }

        case SEARCH_BY_NAME:
            return {
                ...state,
                pokemons: action.payload,
            }

        case FILTER_BY_TYPE:

            const allPokemons = state.allPokemon;
            const filterTypes = allPokemons.filter(el => {
                let types = el.types.map(el => el.Nombre);
                return types.includes(action.payload)
            })
            console.log(filterTypes)

            return {
                ...state,
                pokemons: action.payload === "All" ? allPokemons : filterTypes
            }

        case FILTER_CREATED_API:

            const pokemons = state.allPokemon;
            //const filterCreated = pokemons.filter(el => action.payload === 'created' ? el.hasOwnProperty('createdInDb') : action.payload === 'Api' ? !el.createdInDb: el)
            const filterCreated = action.payload === 'created' ? pokemons.filter(el => el.createdInDb) : pokemons.filter(el => !el.createdInDb)
            console.log(filterCreated)
            return {
                ...state,
                pokemons: action.payload === 'All' ? pokemons : filterCreated
            }

        case "FILTERHP":

            const allpokemon3 = state.allPokemon
            const filterhp = allpokemon3.filter(el => el.Fuerza > 30000)

            return {
                ...state,
                pokemons: filterhp
            }
        case ORDER_BY_NAME:

            const OrderName = action.payload === 'AscName' ?
                state.pokemons.sort((a, b) => (a.Nombre > b.Nombre) ? -1
                    : (b.Nombre > a.Nombre) ? 1 : 0)
                : state.pokemons.sort((a, b) => (a.Nombre > b.Nombre) ? 1
                    : (b.Nombre > a.Nombre) ? -1 : 0)
            console.log(OrderName)
            return {
                ...state,
                pokemons: OrderName
            }

        case ORDER_BY_HP:

            const OrderHp = action.payload === 'Aschp' ?
                state.pokemons.sort((a, b) => (a.Fuerza > b.Fuerza) ? -1
                    : (b.Fuerza > a.Fuerza) ? 1 : 0)
                : state.pokemons.sort((a, b) => (a.Fuerza > b.Fuerza) ? 1
                    : (b.Fuerza > a.Fuerza) ? -1 : 0)

            return {
                ...state,
                pokemons: OrderHp
            }

        case POST_POKEMON:
            return {
                ...state
            }

        case GET_TYPES:
            console.log(action.payload)
            return {
                ...state,
                pokemonTypes: action.payload
            }

        case GET_BY_ID:
            return {
                ...state,
                detail: action.payload
            }

        default:
            return state;
    }
};





export default rootReducer;