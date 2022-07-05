import React from "react";
import style from './Paginado.module.css';


export default function Paginado({ allPokemon, pokemonPerPage, Paginado }) {

    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(allPokemon.length / pokemonPerPage); i++) {
        pageNumbers.push(i + 1)
    }

    return (
        <nav className={style.nav}>
            <ul className={style.ul}>
                {pageNumbers?.map(n => {
                    return (
                        <li key={n} className={style.li}>
                            <a onClick={() => Paginado(n)} className={style.an}> {n} </a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
};