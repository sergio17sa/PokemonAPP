import React from 'react';
import { Link } from 'react-router-dom';
import style from './Landing.module.css';



export default function LandingPage() {
    return (
        <div className={style.container}>
            <div className={style.container}>
                <div >
                    <h1 className={style.titulo} >POKEMON</h1>
                </div>
                <Link to='/home'>
                    <button className={style.btn} > INGRESAR </button>
                </Link>
            </div>
        </div>
    )
};