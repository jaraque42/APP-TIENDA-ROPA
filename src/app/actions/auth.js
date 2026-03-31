"use server";
/**
 * AERDNA AUTHENTICATION ENGINE (SERVER ACTIONS)
 * 📂 Ubicación: src/app/actions/auth.js
 * 
 * Este archivo contiene la lógica de negocio que se ejecuta en el SEVIDOR.
 * Es aquí donde conectamos la UI con la base de datos real en Vercel.
 */
import { userDb } from "@/lib/user-db.js";
import { cookies } from "next/headers";

/**
 * Registra a un nuevo recluta en la base operativa.
 * @param {Object} formData Datos del atleta.
 */
export async function registerAction(formData) {
  const { name, email, password } = formData;

  // 1. Simulación de retardo (para UX de red)
  await new Promise(resolve => setTimeout(resolve, 500));

  // 2. Validación técnica
  const existingUser = await userDb.findByEmail(email);
  if (existingUser) {
    return { success: false, error: "El email ya está registrado en nuestra base." };
  }

  // 3. Creación en la "Base de Datos"
  const newUser = await userDb.create({ name, email, password });

  // 4. Sesión automática tras registro
  (await cookies()).set("aerdna_token", JSON.stringify(newUser), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 días de acceso
    path: "/",
  });

  return { success: true, user: newUser };
}

/**
 * Inicia sesión operativa de un atleta.
 */
export async function loginAction(email, password) {
  // 1. Simulación de retardo
  await new Promise(resolve => setTimeout(resolve, 500));

  // 2. Consulta a la "Base de Datos"
  const user = await userDb.findByEmail(email);

  if (user && user.password === password) {
    // 3. Crear Cookie de Sesión Inteligente
    (await cookies()).set("aerdna_token", JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return { success: true, user };
  }

  return { success: false, error: "Credenciales inválidas. Acceso denegado." };
}

/**
 * Cierra la sesión y limpia el rastro.
 */
export async function logoutAction() {
  (await cookies()).delete("aerdna_token");
  return { success: true };
}
