/**
 * AERDNA USER DATABASE SERVICE (MOCK LAYER)
 * 📂 Ubicación: src/lib/user-db.js
 * 
 * Este archivo actúa como una "puerta" (Repository Pattern).
 * Actualmente usa una simulación en memoria/archivo local, pero su código está
 * diseñado para que mañana solo tengas que conectar Prisma o SQL aquí dentro.
 */

// Simulación de base de datos en memoria para desarrollo local rápido
let mockUsers = [];

// En una app real, aquí importarías tu cliente de base de datos (ej: prisma o @vercel/postgres)
// import { sql } from "@vercel/postgres";

export const userDb = {
  /**
   * Busca un usuario por su email técnico.
   */
  async findByEmail(email) {
    // SIMULACIÓN: En el futuro será: 
    // const { rows } = await sql`SELECT * FROM users WHERE email = ${email}`;
    return mockUsers.find(u => u.email === email);
  },

  /**
   * Registra un nuevo recluta en la base.
   */
  async create(userData) {
    // SIMULACIÓN: En el futuro será:
    // await sql`INSERT INTO users (name, email, password) VALUES (...)`;
    const newUser = {
      ...userData,
      id: Math.random().toString(36).substring(7),
      role: 'RECLUTA',
      createdAt: new Date().toISOString()
    };
    mockUsers.push(newUser);
    return newUser;
  },

  /**
   * Obtiene todos los usuarios (Solo para propósitos de administración).
   */
  async getAll() {
    return mockUsers;
  }
};
