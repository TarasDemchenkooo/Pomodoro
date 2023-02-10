import React, { ChangeEvent, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useDispatch } from "react-redux"
import { ITask, store, editDeleteTask, currentTask } from "../../../../../Redux/Redux"
import style from './ModalEdit.css'

interface IProps {
    isToEdit: boolean
    id: string
    name: string
    close: () => void
}

export const ModalEdit = (props: IProps) => {
    const node = document.querySelector('#modal-edit-delete')
    const [val, setVal] = useState<string>(props.name)
    const ref = useRef<HTMLInputElement>(null)
    const dispatch = useDispatch()
    if (!node) return <></>

    const handler = (event: ChangeEvent<HTMLInputElement>) => {
        setVal(event.target.value)
    }

    return createPortal(props.isToEdit ?
        <div className={style.modal}>
            <div className={style.modalDelete}>
                <h3 className={style.modalDeleteText}>Изменить задачу?</h3>
                <label className={style.input} htmlFor="edit">
                    <input ref={ref} placeholder='Изменить' type="text" id="edit" value={val} onChange={handler} />
                </label>
                <button className={style.modalDeleteTrueEdit} onClick={(e) => {
                    e.stopPropagation()
                    const newValue = ref.current?.value || ''
                    const currentTaskName = store.getState().currentTask.payload
                    const tasks: Array<ITask> = store.getState().tasks.payload
                    const newTasks: any = []
                    tasks.map(i => i.id === props.id ? newTasks.push({ name: newValue, id: i.id, time: i.time })
                        : newTasks.push(i))
                    dispatch(editDeleteTask(newTasks))
                    dispatch(currentTask({ ...currentTaskName, name: newValue }))
                    props.close()
                }}>Изменить</button>
                <button onClick={props.close} className={style.modalDeleteFalse}>Отмена</button>
                <svg onClick={props.close} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.9115 13.8058L6.84406 18.9567L4.96166 17.0433L10.0291 11.8924L5.0675 6.84914L6.85992 5.02721L11.8215 10.0705L16.7673 5.04334L18.6497 6.95672L13.7039 11.9839L18.6655 17.0272L16.8731 18.8491L11.9115 13.8058Z" fill="#C4C4C4" />
                </svg>
            </div>
        </div>
        :
        <div className={style.modal}>
            <div className={style.modalDelete}>
                <h3 className={style.modalDeleteText}>Удалить задачу?</h3>
                <button className={style.modalDeleteTrue} onClick={(e) => {
                    e.stopPropagation()
                    const tasks: Array<ITask> = store.getState().tasks.payload
                    const newTasks: any = []
                    tasks.map(i => i.id === props.id ? '' : newTasks.push(i))
                    dispatch(editDeleteTask(newTasks))
                    dispatch(currentTask(tasks.find(i => i.id !== props.id) || {name: 'Неизвестно', id: '', time: 0}))
                }}>Удалить</button>
                <button onClick={props.close} className={style.modalDeleteFalse}>Отмена</button>
                <svg onClick={props.close} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.9115 13.8058L6.84406 18.9567L4.96166 17.0433L10.0291 11.8924L5.0675 6.84914L6.85992 5.02721L11.8215 10.0705L16.7673 5.04334L18.6497 6.95672L13.7039 11.9839L18.6655 17.0272L16.8731 18.8491L11.9115 13.8058Z" fill="#C4C4C4" />
                </svg>
            </div>
        </div>, node)
}
