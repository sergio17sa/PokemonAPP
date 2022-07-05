import axios from 'axios';
import { GET_POKEMON, FILTER_BY_TYPE, FILTER_CREATED_API, ORDER_BY_NAME, ORDER_BY_HP, SEARCH_BY_NAME, GET_TYPES, POST_POKEMON, GET_BY_ID } from '../ActionsVariables';


export function GetAllPokemon() {

    return async function (dispatch) {
        const json = await axios.get('http://localhost:3001/pokemons');
        dispatch({
            type: GET_POKEMON,
            payload: json.data
        });
    }
};

export function GetPokemonById(name) {

    return async function (dispatch) {

        try {

            const json = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
            dispatch({
                type: SEARCH_BY_NAME,
                payload: [json.data]
            });

        } catch (error) {
            console.log(error)
        }
    }
};


export function GetPokemonType() {

    return async function (dispatch) {

        try {
            const json = await axios.get('http://localhost:3001/types');
            dispatch({
                type: GET_TYPES,
                payload: json.data
            })

        } catch (error) {
            console.log(error)
        }
    };
};

export function getPokemonDetail(id) {

    return async function (dispatch) {

        try {

            const json = await axios.get(`http://localhost:3001/pokemons/${id}`)
            dispatch({
                type: GET_BY_ID,
                payload: [json.data]
            });

        } catch (error) {
            console.log(error); 
        }
    };
};

export function postPokemon(payload) {

    return async function (dispatch) {

        try {
            const res = await axios.post('http://localhost:3001/pokemons', payload);
            console.log(res);
            return res;

        } catch (error) {
            console.log(error);
        }
    };
};

export function filterByType(payload) {
    console.log(payload)
    return {
        type: FILTER_BY_TYPE,
        payload
    }
};

export function FilterByCreated(payload) {
    return {
        type: FILTER_CREATED_API,
        payload
    }
};

export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload
    }
};

export function orderByHp(payload) {
    return {
        type: ORDER_BY_HP,
        payload
    }
};


export function filtrHp(){
    return{
        type: "FILTERHP",
        
    }
}