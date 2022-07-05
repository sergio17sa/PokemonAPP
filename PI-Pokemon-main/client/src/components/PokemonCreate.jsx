import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postPokemon, GetPokemonType, GetAllPokemon } from '../actions';
import style from './PokemonCreate.module.css'



export default function PokemonCreate() {

    const dispatch = useDispatch();
    const pokemonTypes = useSelector((state) => state.pokemonTypes);
    const navigate = useNavigate();
    const allpokemon = useSelector((state) => state.pokemons)

    const [input, setInput] = useState({
        Nombre: "",
        Vida: "",
        Fuerza: "",
        Defensa: "",
        Velocidad: "",
        Altura: "",
        Peso: "",
        Image: "",
        types: []
    });

    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(GetPokemonType());
        dispatch(GetAllPokemon())
    }, []);

    const validate = () => {
        let errors = {};

        if (input.Nombre) {
            for (let i = 0; i < allpokemon.length; i++) {
                if (allpokemon[i].Nombre.toLowerCase() === input.Nombre.toLowerCase()) {
                    errors.Nombre = `el Pokemon ${input.Nombre} ya existe`
                }
            }

        } else {
            errors.Nombre = "El nombre es requerido"
        }

        if (Number(input.Vida) <= 0) {
            errors.Vida = 'El valor ingresado debe ser mayor a 0'
        }
        if (Number(input.Defensa) <= 0) {
            errors.Defensa = 'El valor ingresado debe ser mayor a 0'
        }
        if (Number(input.Velocidad) <= 0) {
            errors.Velocidad = 'El valor ingresado debe ser mayor a 0'
        }
        if (Number(input.Fuerza) <= 0) {
            errors.Fuerza = 'El valor ingresado debe ser mayor a 0'
        }
        if (Number(input.Peso) <= 0) {
            errors.Peso = 'El valor ingresado debe ser mayor a 0'
        }
        if (Number(input.Altura) <= 0) {
            errors.Altura = 'El valor ingresado debe ser mayor a 0'
        }
        return errors;

    };


    const handleInputChange = (e) => {
        console.log(e.target)

        e.target.type === "number" ?
            setInput({
                ...input,
                [e.target.name]: Number(e.target.value)
            })
            : setInput({
                ...input,
                [e.target.name]: e.target.value
            })

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))

        console.log(errors)
    };

    const handleSelectChange = (e) => {

        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
    };

    const handleSubmit = (e) => {

        e.preventDefault();
        dispatch(postPokemon(input));
        alert(`Pokemon ${input.Nombre} creado correctamente`)
        setInput({
            Nombre: "",
            Vida: "",
            Fuerza: "",
            Defensa: "",
            Velocidad: "",
            Altura: "",
            Peso: "",
            Image: "",
            types: []
        })
        navigate('/home')
    };

    const handleDelete = (el) => {
        setInput({
            ...input,
            types: input.types.filter(types => types !== el)
        })
    };



    return (
        <div className={style.container_form}>
            <div>
                <form className={style.form}>
                    <div className={style.tittle_form}>
                        BIENVENIDO
                    </div>
                    <div className={style.subtitle}>Crea tu pokemon!</div>
                    <div className={style.input_container_ic1}>
                        <label className={style.placeholder}>Nombre</label>
                        <input type="text" value={input.Nombre} name='Nombre' onChange={(e) => handleInputChange(e)} placeholder=" " className={style.input} />
                        {errors.Nombre && <p className={style.errors}>{errors.Nombre}</p>}
                    </div>
                    <div className={style.input_container_ic1}>
                        <label className={style.placeholder}>Vida</label>
                        <input type="number" value={input.Vida} name='Vida' onChange={(e) => handleInputChange(e)} placeholder=" " className={style.input} />
                        {errors.Vida && <p className={style.errors}>{errors.Vida}</p>}
                    </div>
                    <div className={style.input_container_ic1}>
                        <label className={style.placeholder}>Defensa</label>
                        <input type="number" value={input.Defensa} name='Defensa' onChange={(e) => handleInputChange(e)} placeholder=" " className={style.input} />
                        {errors.Defensa && <p className={style.errors}>{errors.Defensa}</p>}
                    </div>
                    <div className={style.input_container_ic1}>
                        <label className={style.placeholder}>Velocidad</label>
                        <input type="number" value={input.Velocidad} name='Velocidad' onChange={(e) => handleInputChange(e)} placeholder=" " className={style.input} />
                        {errors.Velocidad && <p className={style.errors}>{errors.Velocidad}</p>}

                    </div>
                    <div className={style.input_container_ic1}>
                        <label className={style.placeholder}>Fuerza</label>
                        <input type="number" value={input.Fuerza} name='Fuerza' onChange={(e) => handleInputChange(e)} placeholder=" " className={style.input} />
                        {errors.Fuerza && <p className={style.errors}>{errors.Fuerza}</p>}

                    </div>
                    <div className={style.input_container_ic1}>
                        <label className={style.placeholder}>Peso</label>
                        <input type="number" value={input.Peso} name='Peso' onChange={(e) => handleInputChange(e)} placeholder=" " className={style.input} />
                        {errors.Peso && <p className={style.errors} >{errors.Peso}</p>}

                    </div>
                    <div className={style.input_container_ic1}>
                        <label className={style.placeholder}>Altura</label>
                        <input type="number" value={input.Altura} name='Altura' onChange={(e) => handleInputChange(e)} placeholder=" " className={style.input} />
                        {errors.Altura && <p className={style.errors}>{errors.Altura}</p>}

                    </div>
                    <div className={style.input_container_ic1}>
                        <label className={style.placeholder}>Imagen Url</label>
                        <input type="text" value={input.Image} name='Image' onChange={(e) => handleInputChange(e)} placeholder=" " className={style.input} />
                        {errors.Image && (<p className={style.errors}>{errors.Image}</p>)}

                    </div>
                    <div className={style.input_container_ic1}>
                        <label className={style.placeholder}>Tipo</label>
                        <select onChange={(e) => handleSelectChange(e)} className={style.input} placeholder=" " >
                            {pokemonTypes.map(el => {
                                return (
                                    <option value={el.Nombre}>{el.Nombre}</option>
                                )
                            })}
                        </select>
                    </div>
                    {console.log(errors)}
                    <input   className={style.btn} disabled={Object.keys(errors).length > 0 ? true : false} onClick={(e) => handleSubmit(e)} />
                    <div >
                        <Link to='/home'>
                            <button className={style.btn}>
                                Regresar
                            </button>
                        </Link>
                    </div>
                    <div className={style.filtro}>
                        {input.types.map(el => {
                            return (
                                <div>
                                    <button className={style.btn} type="onclick" onClick={() => handleDelete(el)}>X</button>
                                    <p>{`${el} `}</p>
                                </div>
                            )
                        })}
                    </div>
                </form>
            </div>
        </div>
    )
};