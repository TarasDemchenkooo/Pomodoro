import React from "react"
import { useSelector } from "react-redux"
import { rootState } from "../../Redux/Redux"
import style from './BodyStats.css'
import { ChartElement } from './Chart/Chart'

export const BodyStats = () => {
    const currentDay = useSelector((state: rootState) => state.currentDay.payload)
    const activityTime = useSelector((state: rootState) => state.activityTime.payload)
    const pauseTime = useSelector((state: rootState) => state.pauseTime.payload)
    const activityMinutes: any = Math.floor(useSelector((state: rootState) =>
        state.activityTime.payload) / 60)
    const activitySeconds = useSelector((state: rootState) =>
        state.activityTime.payload) - activityMinutes * 60
    const pauseMinutes: any = Math.floor(useSelector((state: rootState) =>
        state.pauseTime.payload) / 60)
    const pauseSeconds = useSelector((state: rootState) =>
        state.pauseTime.payload) - pauseMinutes * 60
    const tomatos = useSelector((state: rootState) => state.tomatos.payload)
    const stops = useSelector((state: rootState) => state.stops.payload)
    const focus = Math.floor((activityTime / (activityTime + pauseTime)) * 100)

    return (
        <div className={style.container}>
            <h3 className={style.title}>Ваша активность</h3>
            <div className={style.center}>
                <div className={style.centerLeft}>
                    <div className={style.centerTop}>
                        <h4 className={style.day}>{currentDay}</h4>
                        <span className={style.time}>
                            Вы работали над задачами в течение
                            <span>
                                {' '.concat(activityMinutes).concat(' ')}
                                минут
                                {' '.concat(activitySeconds.toString()).concat(' ')}
                                секунд.
                            </span>
                        </span>
                    </div>
                    <div className={style.centerBottom}>
                        <div className={style.centerBottomDisplay}>
                            <svg width="81" height="81" viewBox="0 0 81 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_16_566)">
                                    <path d="M78.8031 47.4453C78.8031 68.5505 61.6937 81.2964 40.5884 81.2964C19.4825 81.2964 2.37305 64.187 2.37305 43.0811C2.37305 21.9758 20.017 9.00003 41.1223 9.00003C62.2283 9.00003 78.8031 26.3393 78.8031 47.4453Z" fill="#DC3E22" />
                                    <path d="M57.1821 25.5283C55.3254 23.6378 52.3214 21.8798 50.0845 21.3658C51.3138 20.2757 51.5612 20.2398 53.1011 19.4768C57.0471 17.5237 62.8917 17.3438 62.8917 17.3438C62.8917 17.3438 55.9932 13.7785 50.9492 14.0022C49.6651 14.0587 48.3107 14.5124 47.004 15.1552C47.7408 14.1154 48.439 13.0815 48.8853 12.3048C50.2508 9.92997 51.6862 6.93822 51.6862 6.93822C51.6862 6.93822 46.3974 7.22062 43.9441 10.1567C43.0125 11.2721 42.3092 12.6892 41.7945 14.0186C40.8804 12.9685 39.8715 12.0334 38.8625 11.3035C33.8174 7.65241 25.7565 8.4423 25.7565 8.4423C25.7565 8.4423 31.8459 11.8966 34.5857 15.3425C35.6554 16.6882 36.7411 17.3106 37.3901 18.8194C35.1468 18.3337 30.0853 18.4997 27.6007 19.4209C21.2162 21.7888 18.4651 31.3165 18.4651 31.3165C18.4651 31.3165 24.6953 27.0221 33.1722 24.0095C35.036 23.3473 37.0065 23.1718 38.7239 23.202C37.9443 24.4165 37.0926 25.9936 36.4481 27.8531C34.88 32.3805 36.9521 43.1555 36.9521 43.1555C36.9521 43.1555 41.4915 36.7834 43.3412 31.6218C44.2905 28.9723 44.5255 26.3121 44.5307 24.3491C46.2141 25.0961 48.1968 26.1872 49.6786 27.131C57.2658 31.9651 60.8959 40.7907 60.8959 40.7907C60.8959 40.7907 61.9531 30.3871 57.1821 25.5283Z" fill="#899441" />
                                    <path d="M41.5144 20.8766C41.4903 20.8766 41.4662 20.876 41.4421 20.8754C39.9416 20.8365 38.757 19.5894 38.7934 18.0902C38.7965 17.9604 38.9275 8.83157 33.8564 4.86227C32.6735 3.93653 32.4647 2.2272 33.3904 1.04376C34.3168 -0.139053 36.0261 -0.347931 37.2089 0.578423C44.4609 6.25335 44.2446 17.7416 44.2323 18.228C44.1933 19.705 42.9833 20.8766 41.5144 20.8766Z" fill="#A8B64F" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_16_566">
                                        <rect width="81" height="81" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <div className={style.count}>х {tomatos}</div>
                        </div>
                        <div className={style.centerBottomCount}>{tomatos} помидоров</div>
                    </div>
                </div>
                <div className={style.centerRight}>
                    <ChartElement/>
                </div>
            </div>
            <div className={style.bottom}>
                <div className={style.item}>
                    <div className={style.textContainer}>
                        <span className={style.textName}>Фокус</span>
                        <span className={style.textValue}>{activityTime === 0 ? 0 : focus}%</span>
                    </div>
                    <svg width="129" height="129" viewBox="0 0 129 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M64.3158 118.632C94.3136 118.632 118.632 94.3136 118.632 64.3158C118.632 34.318 94.3136 10 64.3158 10C34.318 10 10 34.318 10 64.3158C10 94.3136 34.318 118.632 64.3158 118.632Z" stroke="#FFAE35" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M64.5 102C85.2107 102 102 85.2107 102 64.5C102 43.7893 85.2107 27 64.5 27C43.7893 27 27 43.7893 27 64.5C27 85.2107 43.7893 102 64.5 102Z" stroke="#FFAE35" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M64.5 85C75.8218 85 85 75.8218 85 64.5C85 53.1782 75.8218 44 64.5 44C53.1782 44 44 53.1782 44 64.5C44 75.8218 53.1782 85 64.5 85Z" stroke="#FFAE35" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div className={style.item}>
                    <div className={style.textContainer}>
                        <span className={style.textName}>Время на паузе</span>
                        <span className={style.textValue}>
                            {pauseMinutes === 0 ? pauseSeconds.toString().concat('s') : pauseMinutes.toString().concat('m')}
                        </span>
                    </div>
                    <svg width="129" height="129" viewBox="0 0 129 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M64.3158 118.632C94.3136 118.632 118.632 94.3136 118.632 64.3158C118.632 34.318 94.3136 10 64.3158 10C34.318 10 10 34.318 10 64.3158C10 94.3136 34.318 118.632 64.3158 118.632Z" stroke="#9C97D7" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M64.3154 37.1579V64.3158L77.8944 77.8947" stroke="#9C97D7" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div className={style.item}>
                    <div className={style.textContainer}>
                        <span className={style.textName}>Остановки</span>
                        <span className={style.textValue}>{stops}</span>
                    </div>
                    <svg width="129" height="129" viewBox="0 0 129 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M64.3158 118.632C94.3136 118.632 118.632 94.3136 118.632 64.3158C118.632 34.318 94.3136 10 64.3158 10C34.318 10 10 34.318 10 64.3158C10 94.3136 34.318 118.632 64.3158 118.632Z" stroke="#7FC2D7" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M28 27L102 101" stroke="#7FC2D7" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </div>
    )
}
