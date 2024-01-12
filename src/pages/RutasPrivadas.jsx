import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/AppContext.jsx";

const RutasPrivadas = ({ children }) => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  if (!store.token) {
    navigate("/iniciar-sesion");
    return null;
  }

  return children;
};

export default RutasPrivadas;
