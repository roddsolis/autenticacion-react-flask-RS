import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/AppContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { store, actions } = useContext(Context);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Aquí puedes realizar una llamada al servidor para obtener la información del usuario usando el token
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${store.apiURL}/private`, {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener la información del usuario");
        }

        const data = await response.json();
        setUserData(data.success.user);
      } catch (error) {
        console.error("Error al obtener la información del usuario:", error.message);
      }
    };

    fetchUserData();
  }, [store.token]);

  const handleLogout = () => {
    // Limpiar el token y redirigir al usuario a la página de inicio de sesión
    actions.setToken(null);
    navigate("/iniciar-sesion");
  };

  return (
    <div>
      <h3>Hola, {userData ? userData.username : "Usuario"}</h3>
      <p>¡Bienvenido al sitio privado!</p>
      <button className="btn btn-primary" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Home;
