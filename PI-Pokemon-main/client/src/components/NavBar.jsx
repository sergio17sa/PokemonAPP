import React from 'react';
import SearchBar from './SearchBar.jsx'
import style from './NavBar.module.css';



export default function NavBar() {
    return (
        <nav className={style.nav}>
            <div className={style.icon}> Pokemon </div>
            <div className={style.search_box}>
                <SearchBar />
            </div>
            <div>
                <ol className={style.ol}>
                    <li className={style.li}>
                        <a href='/pokemon/create' className={style.a}>Create Pokemon</a>
                    </li>
                </ol>
            </div>
        </nav>
    )
};