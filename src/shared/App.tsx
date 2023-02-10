import React from "react"
import { Provider } from "react-redux"
import { Navigate } from "react-router"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "./LoginPage/Login"
import { Main } from "./MainPage/Main"
import { store } from "./Redux/Redux"
import { Stats } from "./Stats/Stats"

export const AppFn = () => {
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <Provider store={store}>
            {mounted &&
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate replace to='/login' />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/main" element={<Main />} />
                        <Route path="/stats" element={<Stats />} />
                    </Routes>
                </BrowserRouter>
            }
        </Provider>
    )
}

export const App = () => <AppFn />
