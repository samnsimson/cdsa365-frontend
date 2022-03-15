import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";

// LAYOUTS
import Dashboard from "./laouts/dashboardLayout";

// VIEWS
import Login from "./views/login";
import Register from "./views/register";
import Home from "./views/home";
import Authenticate from "./views/authenticate";
import AuthSetup from "./views/auth-setup";
import WebFont from "webfontloader";
import AddNewTrainers from "./views/add-new-trainers";
import PrivateRoute from "./components/PrivateRoute";

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
        <Route
          exact
          path="/auth-setup"
          element={
            <PrivateRoute>
              <AuthSetup />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/authenticate"
          element={
            <PrivateRoute>
              <Authenticate />
            </PrivateRoute>
          }
        />
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
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
