import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth ? JSON.parse(storedAuth) : null;
  });

  useEffect(() => {
    if (auth) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider 
      value={{ 
        auth, 
        setAuth, 
        logout 
      }}
      className="bg-gradient-to-r from-blue-50 to-indigo-100 
                  text-gray-800 
                  shadow-lg 
                  rounded-lg 
                  p-4"
    >
      {children}
    </AuthContext.Provider>
  );
};