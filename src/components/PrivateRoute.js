import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Dashboard from '../laouts/dashboardLayout'

export const PrivateRoute = ({ children }) => {
    const { isLoggedIn } = useSelector((state) => state.user)
    return isLoggedIn ? children : <Navigate to="/login" />
}

export const PrivateOutlet = () => {
    const { isLoggedIn } = useSelector((state) => state.user)
    return isLoggedIn ? <Dashboard /> : <Navigate to="/login" />
}
