import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// LAYOUTS
import Dashboard from "./laouts/dashboardLayout";

// VIEWS
import Login from "./views/login";
import Register from "./views/register";
import Home from "./views/home";
import Authenticate from "./views/authenticate";
import AuthSetup from "./views/auth-setup";
import WebFont from "webfontloader";
import { useEffect } from "react";

// APPLICATION
const App = () => {
    useEffect(() => {
        WebFont.load({
            google: {
                families: [
                    "Montserrat:400,700",
                    "Source Sans Pro:400,700",
                    "sans-serif",
                ],
            },
        });
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/auth-setup" element={<AuthSetup />} />
                <Route exact path="/authenticate" element={<Authenticate />} />
                <Route element={<Dashboard />}>
                    <Route exact path="/dashboard" element={<Home />} />
                </Route>
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
