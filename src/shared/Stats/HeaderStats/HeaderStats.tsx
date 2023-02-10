import React from "react"
import { useNavigate } from "react-router-dom"
import style from './HeaderStats.css'
import tomato from '../../../assets/images/помидорка-шапка.png'

export const HeaderStats = () => {
    const navigate = useNavigate()

    const handler = () => {
        navigate('/main')
    }

    return (
        <div className={style.container}>
            <div className={style.left}>
                <img src={tomato} alt="Помидорка" />
                pomodoro_box
            </div>
            <button className={style.right} onClick={handler}>
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 1L8 8L1 1" stroke="#B7280F" strokeWidth="2" />
                </svg>
                Главная
            </button>
        </div>
    )
}