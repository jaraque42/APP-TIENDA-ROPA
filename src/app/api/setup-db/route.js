import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function GET() {
  const sql = neon(process.env.DATABASE_URL || process.env.POSTGRES_URL);

  try {
    // 1. Crear extensión para UUID si no existe
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // 2. Levantar tabla USERS
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'RECLUTA',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // 3. Levantar tabla PRODUCTS
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        image VARCHAR(500) NOT NULL,
        category VARCHAR(100) NOT NULL,
        subCategory VARCHAR(100) NOT NULL,
        featured BOOLEAN DEFAULT FALSE,
        description TEXT,
        sizes JSONB,
        specs JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    return NextResponse.json({ 
      success: true, 
      message: 'Base de datos Neon configurada correctamente: Tablas Users y Products listas.' 
    });

  } catch (error) {
    console.error('API Error [Setup DB]:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
