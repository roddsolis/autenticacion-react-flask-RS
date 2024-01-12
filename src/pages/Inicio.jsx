import { Link } from "react-router-dom";

const Inicio = () => {
  return (
    <div className="pageWrapper">
      <h2>¡Bienvenido!</h2>
      <div className="linkWrapper">
        Si eres nuevo y no tienes cuenta <Link to="/crear-cuenta">crea una cuenta aquí</Link>
      </div>
      <div className="linkWrapper">
        Si tienes cuenta <Link to="/iniciar-sesion">inicia sesión</Link>
      </div>
    </div>
  );
};

export default Inicio;
