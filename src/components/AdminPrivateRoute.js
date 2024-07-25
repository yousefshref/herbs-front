import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthContextProvider } from "../contexts/AuthContext";

const AdminPrivateRoute = () => {
  const authContext = React.useContext(AuthContextProvider);

  const navigate = useNavigate();

  useEffect(() => {
    authContext
      .getUser()
      .then((e) => {
        if (!e.data.is_superuser) {
          navigate("/products/");
        } else {
        }
      })
      .catch((err) => {
        navigate("/products/");
      });
  }, []);

  return <Outlet />;
};

export default AdminPrivateRoute;
