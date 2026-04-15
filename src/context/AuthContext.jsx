import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // 🔐 Estado inicial desde localStorage
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  // 🔑 LOGIN
  const login = (jwt) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // 🔁 SINCRONIZAR al recargar la página
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // ✔ estado de autenticación (si hay token o no)
  const isAuth = !!token;

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        isAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 🔥 Hook personalizado
export const useAuth = () => useContext(AuthContext);