import { useState, useContext } from "react";
import { Context } from "../store/AppContext.jsx";
import IniciarSesion from "./IniciarSesion.jsx";
import { useNavigate } from "react-router-dom";

const CrearCuenta = () => {
  const { store, actions } = useContext(Context);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${store.apiURL}/crear-cuenta`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al crear la cuenta");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Cuenta creada exitosamente", data);
        navigate("/iniciar-sesion");
      })
      .catch((error) => {
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
              <label htmlFor="exampleInputUsername1" className="form-label">
                Nombre de usuario
              </label>
              <input type="text" className="form-control" id="exampleInputUsername1" onChange={(e) => setUsername(e.target.value)} value={username} />
            </div>
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
              <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} value={password} />
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
