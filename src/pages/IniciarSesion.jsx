import { useState, useContext } from "react";
import { Context } from "../store/AppContext.jsx";
import { useNavigate } from "react-router-dom";

const IniciarSesion = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${store.apiURL}/iniciar-sesion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al iniciar sesión");
      }

      const data = await response.json();
      actions.setToken(data.access_token);
      navigate("/home");
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    }
  };

  return (
    <div className="pageWrapper">
      <h2>Inicia Sesión</h2>
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
          <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>
        <button type="submit" className="btn btn-primary">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default IniciarSesion;
