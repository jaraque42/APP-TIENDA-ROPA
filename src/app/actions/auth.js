"use server";
/**
 * AERDNA AUTHENTICATION ENGINE (SERVER ACTIONS)
 * 📂 Ubicación: src/app/actions/auth.js
 * 
 * Este archivo contiene la lógica de negocio que se ejecuta en el SERVIDOR.
 * Conectado a Neon Database en Vercel.
 */
import { userDb } from "@/lib/user-db.js";
import { cookies } from "next/headers";

/**
 * Registra a un nuevo recluta en la base operativa.
 * @param {Object} formData Datos del atleta.
 */
export async function registerAction(formData) {
  const { name, email, password } = formData;

  // 1. Validación técnica
  const existingUser = await userDb.findByEmail(email);
  if (existingUser) {
    return { success: false, error: "El email ya está registrado en nuestra base." };
  }

  // 2. Creación en Neon Database
  const newUser = await userDb.create({ name, email, password });

  // 3. Datos seguros para la cookie (sin contraseña)
  const safeUser = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };

  // 4. Sesión automática tras registro
  (await cookies()).set("aerdna_token", JSON.stringify(safeUser), {
    httpOnly: false, // Para que el cliente pueda leerla y restaurar sesión
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 días
    path: "/",
  });

  return { success: true, user: safeUser };
}

/**
 * Inicia sesión operativa de un atleta.
 */
export async function loginAction(email, password) {
  // 1. Consulta a Neon Database
  const user = await userDb.findByEmail(email);

  if (user && user.password === password) {
    // 2. Datos seguros para la cookie (sin contraseña)
    const safeUser = { id: user.id, name: user.name, email: user.email, role: user.role };

    // 3. Crear Cookie de Sesión
    (await cookies()).set("aerdna_token", JSON.stringify(safeUser), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return { success: true, user: safeUser };
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
