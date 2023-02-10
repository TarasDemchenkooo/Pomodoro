import React, { useEffect, useState } from "react"
import { useDispatch, useStore } from "react-redux"
import { currentTask, rootState } from "../../../Redux/Redux"
import { Dropdown } from "./Dropdown/Dropdwon"
import style from './Task.css'

interface ITask {
    task: string
    number: number
    id: string
    timer: () => void
    unmount: () => void
}

export const Task = (props: ITask) => {
    const [state, setState] = useState(false)
    const dispatch = useDispatch()
    const tasks = useStore<rootState>().getState().tasks.payload

    useEffect(() => {
        return () => {
            props.unmount()
        }
    }, [])

    return (
        <li className={style.task} onClick={() => {
            const currentTaskName = tasks.find(i => i.id === props.id)
            dispatch(currentTask(currentTaskName || { name: '', id: '', time: 0 }))
            props.timer()
        }}>
            <div className={style.group}>
                <div className={style.number}>{props.number}</div>
                <div className={style.taskName}>{props.task}</div>
            </div>
            <button onClick={() => setState(!state)} className={style.dropdownOpen}>
                <svg width="26" height="6" viewBox="0 0 26 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="3" cy="3" r="3" fill="#C4C4C4" />
                    <circle cx="13" cy="3" r="3" fill="#C4C4C4" />
                    <circle cx="23" cy="3" r="3" fill="#C4C4C4" />
                </svg>
            </button>
            {state && (<Dropdown id={props.id} name={props.task} close={() => setState(false)} />)}
        </li>
    )
}