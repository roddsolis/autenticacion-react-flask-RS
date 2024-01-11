import { useContext } from "react";
import { Context } from "../store/AppContext.jsx";
import IniciarSesion from "./IniciarSesion.jsx";

const CrearCuenta = () => {
  const { store, actions } = useContext(Context);

  console.log(store);
  console.log(actions);

  return (
    <>
      {!store.currentUser ? (
        <div className="pageWrapper">
          <h2>Crea una cuenta</h2>
          <form action="" method="post" onSubmit={(e) => e.preventDefault()}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Correo electrónico
              </label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Contraseña
              </label>
              <input type="password" className="form-control" id="exampleInputPassword1" />
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
