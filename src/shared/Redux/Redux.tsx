import { composeWithDevTools } from "redux-devtools-extension";
import { AnyAction, legacy_createStore } from "redux/";
import Day from "../Heplers/Heplers";

export interface ITask {
    name: string
    id: string
    time: number
}

interface IAccount {
    name: string
    email: string
}

export interface rootState {
    account: {
        type: string
        payload: IAccount
    },
    tasks: {
        type: string
        payload: Array<ITask>
    },
    currentTask: {
        type: string
        payload: ITask
    },
    tomatos: {
        type: string
        payload: number
    }
    stops: {
        type: string
        payload: number
    }
    activityTime: {
        type: string
        payload: number
    }
    pauseTime: {
        type: string
        payload: number
    }
    currentDay: {
        type: string
        payload: string
    }
}

const initialState = {
    account: {
        type: 'account',
        payload: {
            name: '',
            email: '',
        },
    },
    tasks: {
        type: 'tasks',
        payload: [],
    },
    currentTask: {
        type: 'current-task',
        payload: {
            name: '',
            id: '',
            time: 0,
        },
    },
    tomatos: {
        type: 'tomatos',
        payload: 0,
    },
    stops: {
        type: 'stops',
        payload: 0,
    },
    activityTime: {
        type: 'activity-time',
        payload: 0,
    },
    pauseTime: {
        type: 'pause-time',
        payload: 0,
    },
    currentDay: {
        type: 'day',
        payload: Day
    }
}

export const createAccount = (name: string, email: string) => {
    return {
        type: 'update-account',
        payload: {
            name: name,
            email: email
        }
    }
}

export const createTask = (task: string, id: string, time: number) => {
    return {
        type: 'update-tasks',
        payload: {
            name: task,
            id: id,
            time: time
        }
    }
}

export const currentTask = (obj: ITask) => {
    return {
        type: 'update-current-task',
        payload: obj
    }
}

export const editDeleteTask = (array: Array<ITask>) => {
    return {
        type: 'edit-delete-task',
        payload: array
    }
}

export const updateTomatos = () => {
    return {
        type: 'update-tomatos',
        payload: 1
    }
}

export const updateStops = () => {
    return {
        type: 'update-stops',
        payload: 1
    }
}

export const updateActivityTime = (time: number) => {
    return {
        type: 'update-activity-time',
        payload: time
    }
}

export const updatePauseTime = (time: number) => {
    return {
        type: 'update-pause-time',
        payload: time
    }
}

const rootReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case 'update-account':
            return {
                ...state,
                account: {
                    ...state.account,
                    payload: action.payload
                }
            }
        case 'update-tasks':
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    payload: [...state.tasks.payload.concat(action.payload)]
                }
            }
        case 'update-current-task':
            return {
                ...state,
                currentTask: {
                    ...state.currentTask,
                    payload: action.payload
                }
            }
        case 'edit-delete-task':
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    payload: action.payload
                }
            }
        case 'update-tomatos':
            return {
                ...state,
                tomatos: {
                    ...state.tomatos,
                    payload: state.tomatos.payload + action.payload
                }
            }
        case 'update-stops':
            return {
                ...state,
                stops: {
                    ...state.stops,
                    payload: state.stops.payload + action.payload
                }
            }
        case 'update-activity-time':
            return {
                ...state,
                activityTime: {
                    ...state.activityTime,
                    payload: state.activityTime.payload + action.payload
                }
            }
        case 'update-pause-time':
            return {
                ...state,
                pauseTime: {
                    ...state.pauseTime,
                    payload: state.pauseTime.payload + action.payload
                }
            }
        default:
            return state
    }
}

export const store = legacy_createStore(rootReducer, composeWithDevTools())