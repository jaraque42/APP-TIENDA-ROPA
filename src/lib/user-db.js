/**
 * AERDNA USER DATABASE SERVICE (NEON SERVERLESS)
 * 📂 Ubicación: src/lib/user-db.js
 * 
 * Implementación oficial conectada a Neon Database en Vercel.
 */
import { neon } from '@neondatabase/serverless';

// Conexión principal utilizando la variable de entorno de Vercel (Neon)
// Usa DATABASE_URL o POSTGRES_URL indistintamente
const sql = neon(process.env.DATABASE_URL || process.env.POSTGRES_URL);

export const userDb = {
  /**
   * Busca un usuario por su email técnico.
   */
  async findByEmail(email) {
    try {
      const result = await sql`SELECT * FROM users WHERE email = ${email} LIMIT 1`;
      return result.length > 0 ? result[0] : null;
    } catch (error) {
      console.error('Database Error [findByEmail]:', error);
      return null;
    }
  },

  /**
   * Registra un nuevo recluta en la base.
   */
  async create(userData) {
    const { name, email, password } = userData;
    try {
      // Uso de gen_random_uuid() nativo de Postgres para generar IDs únicos
      const result = await sql`
        INSERT INTO users (id, name, email, password, role) 
        VALUES (gen_random_uuid(), ${name}, ${email}, ${password}, 'RECLUTA')
        RETURNING *
      `;
      return result[0];
    } catch (error) {
      console.error('Database Error [create]:', error);
      throw new Error("No se pudo crear el usuario en Neon.");
    }
  },

  /**
   * Obtiene todos los usuarios (Solo para propósitos de administración).
   */
  async getAll() {
    return await sql`SELECT * FROM users ORDER BY created_at DESC`;
  }
};
