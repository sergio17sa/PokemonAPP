import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { GetPokemonById } from '../actions';
import style from '../components/SearchBar.module.css'


export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState(); // lo utilizo para guardar el valor del input 

    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(GetPokemonById(name))
    };

    return (
        <div className={style.search_box}>
            <input className={style.input} type='text' placeholder='Buscar Pokemon...' onChange={(e) => handleInputChange(e)} />
            <button className={style.buscar} type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
};