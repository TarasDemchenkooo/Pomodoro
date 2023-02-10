import React from "react"
import style from './Header.css'
import tomato from '../../../assets/images/помидорка-шапка.png'
import { useNavigate } from "react-router-dom"

export const Header = () => {
    const navigate = useNavigate()

    const handler = () => {
        navigate('/stats')
    }

    return (
        <div className={style.container}>
            <div className={style.left}>
                <img src={tomato} alt="Помидорка" />
                pomodoro_box
            </div>
            <button className={style.right} onClick={() => handler()}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_10101_158)">
                        <path d="M10 20H14V4H10V20ZM4 20H8V12H4V20ZM16 9V20H20V9H16Z" fill="#DC3E22" />
                    </g>
                    <defs>
                        <clipPath id="clip0_10101_158">
                            <rect width="24" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
                Статистика
            </button>
        </div>
    )
}