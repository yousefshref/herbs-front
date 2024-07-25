import axios from "axios";
import React, { createContext } from "react";
import { server } from "../utlits/Variables";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../utlits/Functions";

const AuthContext = ({ children }) => {
  const navigate = useNavigate();

  const signIn = async (data) => {
    await axios
      .post(`${server}api/login/`, data)
      .then((res) => {
        console.log(res);
        if (res.data.token) {
          document.cookie = `token=${res.data.token}; path=/;`;
          if (res.data.user.is_superuser) {
            navigate("/admin/");
          } else {
            navigate("/products");
          }
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.detail || err.response.data);
      });
  };

  const [user, setUser] = React.useState({});
  const getUser = async () => {
    if (getCookie("token")) {
      const res = await axios.get(`${server}api/user/`, {
        headers: {
          Authorization: `Token ${getCookie("token")}`,
        },
      });
      setUser(res.data);
      return res;
    }
  };

  const signOut = () => {
    document.cookie = "token=; path=/;";
    navigate("/");
    window.location.reload();
  };
  return (
    <AuthContextProvider.Provider value={{ signIn, user, getUser, signOut }}>
      {children}
    </AuthContextProvider.Provider>
  );
};

export default AuthContext;
export const AuthContextProvider = createContext();
