"use client";

import React, { useEffect, useState, createContext } from "react";

export const AuthContext = createContext(undefined);

const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [access_token, setAccess_Token] = useState(null);

  // Check auth status on load
  useEffect(() => {
    const token = localStorage.getItem("Access_Token");
    const userInfo = localStorage.getItem("User_Details");

    if (token && userInfo) {
      setAuth(JSON.parse(userInfo));
      setAccess_Token(token);
    }
  }, []);

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        setLoading(true);
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("Access_Token");
          const userInfo = localStorage.getItem("User_Details");
          const sanitizeduserinfo = JSON.parse(userInfo);
          setAuth(sanitizeduserinfo);
          setAccess_Token(token);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if (isAdd) fetchAuth();
    fetchAuth();
  }, [isAdd]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        error,
        loading,
        setAuth,
        isAdd,
        setIsAdd,
        access_token,
        setAccess_Token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
