import {
    BrowserRouter as Router,
    Route,
    Routes,
  } from "react-router-dom";
//Page imports
import AuthRoute from './AuthRoute';
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/register/Signup";
import CarList from "./pages/cars/MyCars";
import Contracts from "./pages/contracts/CarInsuranceContract";
import AboutUs from "./pages/about_us/AboutUs";
//Routes
export function AppRoutes(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/home" element={<Home/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
				<Route path="/signup" element={<Signup/>}></Route>
                <Route path="/my_cars" element={<AuthRoute><CarList/></AuthRoute>}></Route>
				<Route path="/contracts" element={<AuthRoute><Contracts/></AuthRoute>}></Route>
                <Route path="/about_us" element={<AboutUs/>}></Route>

				<Route path="/inicio" element={<Home/>}></Route>
                <Route path="/entrar" element={<Login/>}></Route>
				<Route path="/cadastro" element={<Signup/>}></Route>
                <Route path="/meus_carros" element={<AuthRoute><CarList/></AuthRoute>}></Route>
				<Route path="/contratos" element={<AuthRoute><Contracts/></AuthRoute>}></Route>
                <Route path="/sobre_nos" element={<AboutUs/>}></Route>
            </Routes>
        </Router>
    )
  }