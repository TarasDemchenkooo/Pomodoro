import React, { useEffect, useRef, useState } from "react"
import style from './Body.css'
import { createTask, currentTask, editDeleteTask, rootState, updateActivityTime, updatePauseTime, updateStops, updateTomatos } from "../../Redux/Redux"
import { Task } from "./Task/Task"
import { useStore, useDispatch, useSelector } from "react-redux"
import { getPadTime } from "../../Heplers/Heplers"

export const Body = () => {
    const nameMe = useStore<rootState>().getState().account.payload.name
    const ref = useRef<HTMLInputElement>(null)
    const dispatch = useDispatch()
    const [state, setState] = useState(true)
    const tasks = useSelector((state: rootState) => state.tasks.payload)
    const { name, time, id } = useSelector((state: rootState) => state.currentTask.payload)
    const minutes: any = getPadTime(Math.floor(useSelector((state: rootState) => state.currentTask.payload.time) / 60))
    const seconds = getPadTime(useSelector((state: rootState) => state.currentTask.payload.time) - minutes * 60)
    const [intervalIdActivity, setIntervalIdActivity] = useState(0)
    const [intervalIdPause, setIntervalIdPause] = useState(0)

    let intervalActivity: any = null
    let intervalPause: any = null

    const handler = () => {
        const value = ref.current?.value || ''
        if (value === '') return
        const id = Math.random().toString(16).slice(2)
        ref.current!.value = ''
        dispatch(createTask(value, id, 1800))
        dispatch(currentTask({ name: value, id: id, time: 1800 }))
        clearInterval(intervalIdActivity)
        clearInterval(intervalIdPause)
        setState(true)
    }

    const tick = () => {
        const currentObject = tasks.find(i => i.id === id)
        if (currentObject?.time === 0) {
            clearInterval(intervalIdActivity)
            setState(true)
            dispatch(updateTomatos())
            const newTasks: any = []
            tasks.map(i => i.id === id ? '' : newTasks.push(i))
            dispatch(editDeleteTask(newTasks))
            dispatch(currentTask(tasks.find(i => i.id !== id) || { name: '', id: '', time: 0 }))
        } else {
            tasks.map(i => i.id === id ? i.time-- : i)
            dispatch(editDeleteTask(tasks))
            dispatch(currentTask(tasks.find(i => i.id === id) || tasks[0]))
            dispatch(updateActivityTime(1))
        }
    }

    const start = () => {
        if (state) {
            intervalActivity = setInterval(tick, 1000)
            setIntervalIdActivity(intervalActivity)
            setState(false)
            clearInterval(intervalIdPause)
        } else {
            clearInterval(intervalIdActivity)
            intervalPause = setInterval(() => { dispatch(updatePauseTime(1)) }, 1000)
            setIntervalIdPause(intervalPause)
            setState(true)
            dispatch(updateStops())
        }
    }

    const stop = () => {
        if (state) {
            clearInterval(intervalIdActivity)
            clearInterval(intervalIdPause)
            setState(true)
            dispatch(updateStops())
            tasks.map(i => i.id === id ? i.time = 1800 : i)
            dispatch(editDeleteTask(tasks))
            dispatch(currentTask(tasks.find(i => i.id === id) || tasks[0]))
        } else {
            clearInterval(intervalIdActivity)
            clearInterval(intervalIdPause)
            setState(true)
            const newTasks: any = []
            tasks.map(i => i.id === id ? '' : newTasks.push(i))
            dispatch(editDeleteTask(newTasks))
            dispatch(currentTask(tasks.find(i => i.id !== id) || { name: '', id: '', time: 0 }))
        }
    }

    useEffect(() => {
        return () => {
            clearInterval(intervalIdActivity)
            clearInterval(intervalIdPause)
        }
    }, [intervalIdActivity, intervalIdPause])

    return (
        <div className={style.container}>
            <div className={style.left}>
                <h3 className={style.name}>Привет {nameMe}! Теперь можно начать работать:</h3>
                <ul className={style.list}>
                    <li className={style.item}>
                        Выберите категорию и напишите название текущей задачи
                    </li>
                    <li className={style.item}>
                        Запустите таймер («помидор»)
                    </li>
                    <li className={style.item}>
                        Работайте пока «помидор» не прозвонит
                    </li>
                    <li className={style.item}>
                        Сделайте короткий перерыв (3-5 минут)
                    </li>
                    <li className={style.item}>
                        Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).
                    </li>
                </ul>
                <label className={style.task} htmlFor="task">
                    <input ref={ref} type="text" id="task" placeholder="Название задачи" />
                </label>
                <button onClick={handler} className={style.addTask}>Добавить</button>
                {tasks.length === 0 ? '' : (
                    <ul className={style.tasksList}>
                        {
                            tasks.map(i => <Task unmount={() => {
                                clearInterval(intervalIdActivity)
                                clearInterval(intervalIdPause)
                            }} timer={() => {
                                clearInterval(intervalIdActivity)
                                setState(true)
                            }} task={i.name} id={i.id} key={i.id} number={tasks.indexOf(i) + 1} />)
                        }
                    </ul>
                )}
            </div>
            <div className={style.right}>
                <div className={style.timerTop}>
                    <span>{name === '' ? 'Неизвестно' : name}</span>
                    <span>Помидор 1</span>
                </div>
                <div className={style.timerBottom}>
                    <div className={style.timerDisplay}>
                        <span className={style.timer}>{time === 0 ? (
                            <>
                                <span>00</span>
                                <span>:</span>
                                <span>00</span>
                            </>
                        ) : (
                            <>
                                <span>{minutes}</span>
                                <span>:</span>
                                <span>{seconds}</span>
                            </>
                        )}</span>
                        <button onClick={() => {
                            if (time === 0) return
                            tasks.map(i => i.id === id ? i.time += 60 : i)
                            dispatch(editDeleteTask(tasks))
                            dispatch(currentTask(tasks.find(i => i.id === id) || tasks[0]))
                        }} className={style.addTime}>
                            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="25" cy="25" r="25" fill="#C4C4C4" />
                                <path d="M26.2756 26.1321V33H23.7244V26.1321H17V23.7029H23.7244V17H26.2756V23.7029H33V26.1321H26.2756Z" fill="white" />
                            </svg>
                        </button>
                    </div>
                    <div className={style.taskTarget}>
                        Задача - <span className={style.taskName}>{name === '' ? 'Неизвестно' : name}</span>
                    </div>
                    <div className={style.buttons}>
                        <button className={style.start} onClick={() => time !== 0 && start()}>{!state ? 'Пауза' : 'Старт'}</button>
                        <button className={style.stop} onClick={() => time !== 0 && stop()}>{state ? 'Стоп' : 'Сделано'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}