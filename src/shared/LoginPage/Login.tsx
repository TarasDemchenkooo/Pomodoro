import React, { FormEvent, useRef } from "react"
import style from './Login.css'
import logo from '../../assets/images/помидорка.png'
import { useDispatch } from "react-redux"
import { createAccount } from "../Redux/Redux"
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const ref1 = useRef<HTMLInputElement>(null)
    const ref2 = useRef<HTMLInputElement>(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handler = (e: FormEvent) => {
        e.preventDefault()
        dispatch(createAccount(ref1.current?.value || '', ref2.current?.value || ''))
        navigate('/main')
    }

    return (
        <div className={style.container}>
            <div className={style.formContainer}>
                <div className={style.top}>
                    <img className={style.img} src={logo} alt="Помидорка" />
                    <span className={style.text}>
                        pomodoro_box
                    </span>
                </div>
                <form onSubmit={handler} className={style.bottom}>
                    <span className={style.formText}>
                        Совсем чуть-чуть и можем начинать!
                    </span>
                    <label className={style.label} htmlFor="1">
                        <input ref={ref1} placeholder="Ваше имя" type="text" id="1" />
                    </label>
                    <label className={style.label} htmlFor="2">
                        <input ref={ref2} placeholder="E-mail" type="text" id="2" />
                    </label>
                    <button className={style.button} type="submit">Зарегестрироваться</button>
                    <label className={style.labelCheck} htmlFor="3">
                        <input id="3" type='checkbox' />
                        Согласен на обработку персональных данных
                    </label>
                </form>
            </div>
        </div>
    )
}
