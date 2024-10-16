import "./App.css";
import { Inicio } from "./views/Inicio/Inicio";
import { Login } from "./views/Login/Login";
import { Register } from "./views/Register/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer} from "react-toastify";

export function App() {

  return (
    <>
    <ToastContainer />
      <Router>
      <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/Inicio" element={<Inicio/>} />
      </Routes>
      </Router>
    </>
  );
}
