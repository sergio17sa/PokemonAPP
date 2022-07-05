import React from 'react';
import { useEffect, useState } from 'react'; //se usan para poder usar componentes de funcion y no de clase 
import { useDispatch, useSelector } from 'react-redux'; //se usan para poder usar componentes de funcion y no de clase 
import { GetAllPokemon, filterByType, FilterByCreated, orderByName, orderByHp, filtrHp } from '../actions';
import imgAlt from '../Resources/pokemonCreate.gif';
import Card from './Card';
import Paginado from './Paginado';
import { Link } from 'react-router-dom';
import style from './Home.module.css';


export default function Home() {

    const dispatch = useDispatch();
    const allPokemon = useSelector((state) => state.pokemons);
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonPerPage, setPokemonPerPage] = useState(12);
    const [order, setOrder] = useState("")
    const positionLastPokemon = currentPage * pokemonPerPage; // inicialmente 12
    const positionFirstPokemon = positionLastPokemon - pokemonPerPage; // incialmente 0
    const PokemonInPage = allPokemon.slice(positionFirstPokemon, positionLastPokemon); // personajes a renderizar por pag 

    const paginado = (PageNumber) => { // me va a ayudar al renderizado 
        setCurrentPage(PageNumber)
    };

    function handleFilterType(e) {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterByType(e.target.value))
    };

    function handleFilterCreated(e) {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(FilterByCreated(e.target.value))
    };

    function handleOrderByName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value)
    };

    function handleOrderByHp(e) {
        e.preventDefault();
        dispatch(orderByHp(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value)
    };


    function handlehp(e) {
        e.preventDefault();
        dispatch(filtrHp())
        setCurrentPage(1);
    }


    useEffect(() => { dispatch(GetAllPokemon()); }, [dispatch]);

    return (

        <div>
            <div className={style.container_select}>
                <select className={style._select_type} onChange={(e) => handleFilterType(e)}>
                    <option className={style.option} value='normal'> normal   </option>
                    <option className={style.option} value='fighting'> fighting </option>
                    <option className={style.option} value='flying'> flying   </option>
                    <option className={style.option} value='poison'> poison   </option>
                    <option className={style.option} value='ground'> ground   </option>
                    <option className={style.option} value='rock'> rock     </option>
                    <option className={style.option} value='bug'> bug      </option>
                    <option className={style.option} value='ghost'> ghost    </option>
                    <option className={style.option} value='steel'> steel    </option>
                    <option className={style.option} value='fire'> fire     </option>
                    <option className={style.option} value='water'> water    </option>
                    <option className={style.option} value='grass'> grass    </option>
                    <option className={style.option} value='electric'> electric </option>
                    <option className={style.option} value='psychic'> psychic  </option>
                    <option className={style.option} value='ice'> ice      </option>
                    <option className={style.option} value='dragon'> dragon   </option>
                    <option className={style.option} value='dark'> dark     </option>
                    <option className={style.option} value='fairy'> fairy    </option>
                    <option className={style.option} value='unknown'> unknown  </option>
                    <option className={style.option} value='shadow'> shadow   </option>
                    <option className={style.option} value='All' selected> Todos </option>
                </select>
                <select className={style._select_created} onChange={(e) => handleFilterCreated(e)}>
                    <option className={style.option} value='Api'>Original</option>
                    <option className={style.option} value='created'>Creados</option>
                    <option className={style.option} value='All'>Todos</option>
                </select>
                <select className={style._select_name} onChange={(e) => handleOrderByName(e)}>
                    <option className={style.option} value='AscName'>Ascendente Z-A</option>
                    <option className={style.option} value='DescName'>Desendente A-Z</option>
                </select>
                <select className={style._select_hp} onChange={(e) => handleOrderByHp(e)}>
                    <option className={style.option} value='Aschp'>Ascendente Mas Fuerte</option>
                    <option className={style.option} value='Deschp'>Descendente Más Debil</option>
                </select>
            </div>
            <div>
                {PokemonInPage.length !== 0 ?
                    PokemonInPage?.map(el => {
                        return (
                            <Link to={`/pokemon/${el.id}`} >
                                <Card
                                    Nombre={el.Nombre}
                                    Imagen={el.Image ? el.Image : <img src={imgAlt} alt="Img not found" />}
                                    types={el.types}
                                    key={el.id} />
                            </Link>
                        )
                    }) : <div className={style.wrapper}>
                        <div className={style.pokeball}>
                        </div>
                    </div>
                }
            </div>
            <div>
                <Paginado
                    allPokemon={allPokemon}
                    pokemonPerPage={pokemonPerPage}
                    Paginado={paginado}
                />
            </div>
        </div>
    )
}




