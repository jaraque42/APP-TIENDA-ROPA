"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { registerAction, loginAction, logoutAction } from "@/app/actions/auth.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Al montar la app, verificamos si hay una sesión activa persistente
  useEffect(() => {
    const savedSession = document.cookie
      .split("; ")
      .find((row) => row.startsWith("aerdna_token="))
      ?.split("=")[1];

    if (savedSession) {
      try {
        // En una app real, esto lo manejaría GetServerSideProps o un Middleware mejor.
        // Pero para esta base técnica, lo decodificamos directamente.
        const decoded = JSON.parse(decodeURIComponent(savedSession));
        setCurrentUser(decoded);
      } catch (e) {
        console.error("Error al restaurar sesión operativa.", e);
      }
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    const result = await registerAction(userData);
    if (!result.success) throw new Error(result.error);
    
    // El servidor ya creó el usuario y la cookie; actualizamos estado local.
    setCurrentUser(result.user);
    return result.user;
  };

  const login = async (email, password) => {
    const result = await loginAction(email, password);
    if (!result.success) throw new Error(result.error);
    
    // Cookie creada por el servidor; actualizamos UI.
    setCurrentUser(result.user);
    return result.user;
  };

  const logout = async () => {
    await logoutAction(); // Limpia la cookie en el servidor
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used dentro de un AuthProvider");
  }
  return context;
}
