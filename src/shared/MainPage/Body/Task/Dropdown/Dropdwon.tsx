import React, { useEffect, useRef, useState } from "react"
import style from './Dropdown.css'
import { ModalEdit } from "./ModalEdit/ModalEdit"

interface IProps {
    id: string
    close: () => void
    name: string
}

export const Dropdown = (props: IProps) => {
    const [editState, setEditState] = useState(false)
    const [deleteState, setDeleteState] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    return (
        <div ref={ref} className={style.dropdown}>
            <button className={style.dropdownBtn} onClick={() => {
                setEditState(true)
            }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_35_33)">
                        <path d="M10.545 6.765L11.235 7.455L4.44 14.25H3.75V13.56L10.545 6.765ZM13.245 2.25C13.0575 2.25 12.8625 2.325 12.72 2.4675L11.3475 3.84L14.16 6.6525L15.5325 5.28C15.825 4.9875 15.825 4.515 15.5325 4.2225L13.7775 2.4675C13.6275 2.3175 13.44 2.25 13.245 2.25ZM10.545 4.6425L2.25 12.9375V15.75H5.0625L13.3575 7.455L10.545 4.6425Z" fill="#A8B64F" />
                    </g>
                    <defs>
                        <clipPath id="clip0_35_33">
                            <rect width="18" height="18" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
                Редактировать
            </button>
            <button onClick={() => {
                setDeleteState(true)
            }} className={style.dropdownBtn}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_35_21)">
                        <path d="M12 6.75V14.25H6V6.75H12ZM10.875 2.25H7.125L6.375 3H3.75V4.5H14.25V3H11.625L10.875 2.25ZM13.5 5.25H4.5V14.25C4.5 15.075 5.175 15.75 6 15.75H12C12.825 15.75 13.5 15.075 13.5 14.25V5.25Z" fill="#A8B64F" />
                    </g>
                    <defs>
                        <clipPath id="clip0_35_21">
                            <rect width="18" height="18" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
                Удалить
            </button>
            {editState && <ModalEdit isToEdit={true} id={props.id} name={props.name} close={() => setEditState(false)} />}
            {deleteState && <ModalEdit isToEdit={false} id={props.id} name={props.name} close={() => setDeleteState(false)} />}
        </div>
    )
}