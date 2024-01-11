import { Navigate } from "react-router-dom";

const RutasPrivadas = ({ user, redirectPath = "/crear-cuenta", children }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default RutasPrivadas;
