import { React, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPokemonDetail } from "../actions";
import style from './Detail.module.css'


export default function Detail() {

    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPokemonDetail(params.id))
    }, [dispatch]);

    const PokemonDetail = useSelector((state) => state.detail);

    const handleChange = (e) => {
        PokemonDetail.detail = []
    };

    return (
        <div className={style.background}>
            <div className={style.container_all}>
                {
                    PokemonDetail.length > 0 ?
                        <div className={style.container_Card}>
                            <div className={style.name}>
                                <p className={style.name}>{PokemonDetail[0].Nombre ? PokemonDetail[0].Nombre : PokemonDetail[0][0].Nombre}</p>
                            </div>
                            <div className={style.pokemon}>
                                <img src={PokemonDetail[0].Image ? PokemonDetail[0].Image : PokemonDetail[0][0].Image} height="425px" width="200px" />
                            </div>
                            <div className={style.types}>
                                <p> Tipo: {PokemonDetail[0].types ? PokemonDetail[0].types.map(el => `${el.Nombre}  `) : PokemonDetail[0][0].types.map(el => `${el.Nombre} `)}</p>
                                <div />
                                <div className={style.vida}>
                                    <p >Vida: {PokemonDetail[0].Vida ? `${PokemonDetail[0].Vida} ` : `${PokemonDetail[0][0].Vida} `}</p>
                                </div>
                                <div className={style.fuerza}>
                                    <p>Fuerza: {PokemonDetail[0].Fuerza ? `${PokemonDetail[0].Fuerza} ` : `${PokemonDetail[0][0].Fuerza} `}</p>
                                </div>
                                <div className={style.defensa}>
                                    <p> Defensa: {PokemonDetail[0].Defensa ? `${PokemonDetail[0].Defensa} ` : `${PokemonDetail[0][0].Defensa} `}</p>
                                </div>
                                <div className={style.Velocidad}>
                                    <p> Velocidad: {PokemonDetail[0].Velocidad ? `${PokemonDetail[0].Velocidad} ` : `${PokemonDetail[0][0].Velocidad} `}</p>
                                </div>
                                <div className={style.altura}>
                                    <p>Altura: {PokemonDetail[0].Altura ? `${PokemonDetail[0].Altura} ` : `${PokemonDetail[0][0].Altura} `}</p>
                                </div>
                            </div>
                        </div>
                        : <span>Loading...</span>
                }
                <Link to='/home'>
                    <button className={style.btn} onClick={(e) => { handleChange(e) }} >Regresar</button>
                </Link>
            </div>
        </div>
    )
};
