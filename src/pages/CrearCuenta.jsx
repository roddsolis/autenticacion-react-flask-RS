import { useState, useContext } from "react";
import { Context } from "../store/AppContext.jsx";
import IniciarSesion from "./IniciarSesion.jsx";
import { useNavigate } from "react-router-dom";

const CrearCuenta = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();

  console.log("API URL:", store.apiURL);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Enviar datos al servidor
    fetch(`${store.apiURL}/crear-cuenta`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: contraseña,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al crear la cuenta");
        }
        return response.json();
      })
      .then((data) => {
        // Manejar la respuesta del servidor según tus necesidades
        console.log("Cuenta creada exitosamente", data);
        navigate("/iniciar-sesion");
      })
      .catch((error) => {
        // Manejar errores de la solicitud
        console.error("Error al crear la cuenta:", error.message);
      });
  };

  return (
    <>
      {!store.currentUser ? (
        <div className="pageWrapper">
          <h2>Crea una cuenta</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Correo electrónico
              </label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Contraseña
              </label>
              <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setContraseña(e.target.value)} value={contraseña} />
            </div>
            <button type="submit" className="btn btn-primary">
              Crear cuenta
            </button>
          </form>
        </div>
      ) : (
        <IniciarSesion />
      )}
    </>
  );
};

export default CrearCuenta;
