import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { useEffect } from 'react'

// VIEWS
import Login from './views/login'
import Register from './views/register'
import Home from './views/home'
import Authenticate from './views/authenticate'
import AuthSetup from './views/auth-setup'
import WebFont from 'webfontloader'
import AddNewTrainers from './views/add-new-trainers'
import { PrivateOutlet } from './components/PrivateRoute'
import ListTrainers from './views/list-trainers'
import ErrorPage from './views/ErrorPage'
import EmailVerify from './views/email-verify'
import Category from './views/category'

// ROUTE PATHS
const path = {
    login: '/login',
    register: '/register',
    authSetup: '/auth-setup',
    auth: '/authenticate',
    pageNotFound: '/page-not-found',
    dashboard: '/dashboard',
    addTrainers: '/dashboard/trainers/add-new',
    viewAllTrainers: '/dashboard/trainers/view-all',
    emailVerify: '/email/verify/:token',
    trainerCat: '/dashboard/category/:entity',
}

// APPLICATION
const App = () => {
    useEffect(() => {
        WebFont.load({
            google: {
                families: [
                    'Montserrat:400,700',
                    'Source Sans Pro:400,700',
                    'sans-serif',
                ],
            },
        })
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path={path.login} element={<Login />} />
                <Route exact path={path.register} element={<Register />} />
                <Route exact path={path.authSetup} element={<AuthSetup />} />
                <Route exact path={path.auth} element={<Authenticate />} />
                <Route exact path={path.pageNotFound} element={<ErrorPage />} />
                <Route
                    exact
                    path={path.emailVerify}
                    element={<EmailVerify />}
                />
                <Route path="/" element={<PrivateOutlet />}>
                    <Route exact path={path.dashboard} element={<Home />} />
                    <Route
                        exact
                        path={path.addTrainers}
                        element={<AddNewTrainers />}
                    />
                    <Route
                        exact
                        path={path.viewAllTrainers}
                        element={<ListTrainers />}
                    />
                    <Route
                        exact
                        path={path.trainerCat}
                        element={<Category />}
                    />
                </Route>
                <Route
                    path="*"
                    element={<Navigate to={path.pageNotFound} replace={true} />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App
