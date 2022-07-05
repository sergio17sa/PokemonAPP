import React from 'react';
import style from './Card.module.css';


export default function Card({ Nombre, Imagen, types }) {

    return (
        <div className={style.container_card}>
            <div>
                <h2 className={style.tittle}> {Nombre} </h2>
            </div>
            <div className={style.image_container}>
                <img src={Imagen} alt="img not found" width='150px' height='200px' />
            </div>
            <figcaption className={style.card__caption}>
                <span className={style.card__type} >{types.map((el => `${el.Nombre}  `))}</span>
            </figcaption>
        </div>
    )
};
