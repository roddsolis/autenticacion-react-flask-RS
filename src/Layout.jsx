import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import injectContext, { Context } from "./store/AppContext";
import Inicio from "./pages/Inicio.jsx";
import IniciarSesion from "./pages/IniciarSesion.jsx";
import CrearCuenta from "./pages/CrearCuenta.jsx";
import Home from "./pages/Home.jsx";
import RutasPrivadas from "./pages/RutasPrivadas.jsx";

const Layout = () => {
  const { store } = useContext(Context);

  console.log(store);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/home"
            element={
              <RutasPrivadas user={""}>
                <Home />
              </RutasPrivadas>
            }
          />

          <Route path="/" element={<Inicio />} />
          <Route path="/iniciar-sesion" element={<IniciarSesion />} />
          <Route path="/crear-cuenta" element={<CrearCuenta />} />
        </Routes>
      </Router>
    </>
  );
};

export default injectContext(Layout);
