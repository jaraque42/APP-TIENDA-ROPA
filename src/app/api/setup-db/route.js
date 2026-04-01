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

    // 4. Levantar tabla CART_ITEMS (carrito por usuario)
    await sql`
      CREATE TABLE IF NOT EXISTS cart_items (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        product_id VARCHAR(255) NOT NULL,
        product_name VARCHAR(255) NOT NULL,
        product_image VARCHAR(500) NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        size VARCHAR(50) NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        cart_key VARCHAR(500) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, cart_key)
      )
    `;

    // 5. Levantar tabla ORDERS (pedidos)
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        total NUMERIC(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'CONFIRMADO',
        payment_method VARCHAR(100) DEFAULT 'TARJETA FICTICIA',
        shipping_name VARCHAR(255),
        shipping_address TEXT,
        shipping_city VARCHAR(255),
        shipping_zip VARCHAR(20),
        card_last_four VARCHAR(4),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // 6. Levantar tabla ORDER_ITEMS (productos de un pedido)
    await sql`
      CREATE TABLE IF NOT EXISTS order_items (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
        product_id VARCHAR(255) NOT NULL,
        product_name VARCHAR(255) NOT NULL,
        product_image VARCHAR(500) NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        size VARCHAR(50) NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    return NextResponse.json({ 
      success: true, 
      message: 'Base de datos Neon configurada: Tablas Users, Products, Cart_Items, Orders y Order_Items listas.' 
    });

  } catch (error) {
    console.error('API Error [Setup DB]:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
