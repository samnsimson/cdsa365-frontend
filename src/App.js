import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { useEffect } from 'react'

// LAYOUTS
import Dashboard from './laouts/dashboardLayout'

// VIEWS
import Login from './views/login'
import Register from './views/register'
import Home from './views/home'
import Authenticate from './views/authenticate'
import AuthSetup from './views/auth-setup'
import WebFont from 'webfontloader'
import AddNewTrainers from './views/add-new-trainers'
import PrivateRoute from './components/PrivateRoute'
import ListTrainers from './views/list-trainers'
import ErrorPage from './views/ErrorPage'

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
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/auth-setup" element={<AuthSetup />} />
                <Route exact path="/authenticate" element={<Authenticate />} />
                <Route exact path="/page-not-found" element={<ErrorPage />} />
                <Route element={<Dashboard />}>
                    <Route
                        exact
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Home />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        exact
                        path="/dashboard/trainers/add-new"
                        element={
                            <PrivateRoute>
                                <AddNewTrainers />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        exact
                        path="/dashboard/trainers/view-all"
                        element={
                            <PrivateRoute>
                                <ListTrainers />
                            </PrivateRoute>
                        }
                    />
                </Route>
                <Route path="*" element={<Navigate to="/page-not-found" />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
