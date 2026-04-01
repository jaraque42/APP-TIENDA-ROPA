/**
 * AERDNA CART DATABASE SERVICE (NEON SERVERLESS)
 * 📂 Ubicación: src/lib/cart-db.js
 * 
 * Gestión del carrito de compras por usuario en Neon Database.
 */
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL || process.env.POSTGRES_URL);

export const cartDb = {
  /**
   * Obtiene todos los ítems del carrito de un usuario.
   */
  async getByUserId(userId) {
    try {
      const items = await sql`
        SELECT * FROM cart_items 
        WHERE user_id = ${userId} 
        ORDER BY created_at ASC
      `;
      return items;
    } catch (error) {
      console.error('Database Error [getByUserId]:', error);
      return [];
    }
  },

  /**
   * Añade un producto al carrito o incrementa la cantidad si ya existe.
   */
  async addItem(userId, product, selectedSize) {
    const cartKey = `${product.id}-${selectedSize}`;
    try {
      // Usar UPSERT: si ya existe ese producto+talla, incrementar cantidad
      const result = await sql`
        INSERT INTO cart_items (user_id, product_id, product_name, product_image, price, size, quantity, cart_key)
        VALUES (${userId}, ${product.id}, ${product.name}, ${product.image}, ${product.price}, ${selectedSize}, 1, ${cartKey})
        ON CONFLICT (user_id, cart_key) 
        DO UPDATE SET quantity = cart_items.quantity + 1
        RETURNING *
      `;
      return result[0];
    } catch (error) {
      console.error('Database Error [addItem]:', error);
      throw new Error("No se pudo añadir el producto al carrito.");
    }
  },

  /**
   * Actualiza la cantidad de un ítem (+1 o -1).
   */
  async updateQuantity(userId, cartKey, delta) {
    try {
      const result = await sql`
        UPDATE cart_items 
        SET quantity = GREATEST(1, quantity + ${delta})
        WHERE user_id = ${userId} AND cart_key = ${cartKey}
        RETURNING *
      `;
      return result[0];
    } catch (error) {
      console.error('Database Error [updateQuantity]:', error);
      throw new Error("No se pudo actualizar la cantidad.");
    }
  },

  /**
   * Elimina un ítem del carrito.
   */
  async removeItem(userId, cartKey) {
    try {
      await sql`
        DELETE FROM cart_items 
        WHERE user_id = ${userId} AND cart_key = ${cartKey}
      `;
      return { success: true };
    } catch (error) {
      console.error('Database Error [removeItem]:', error);
      throw new Error("No se pudo eliminar el producto.");
    }
  },

  /**
   * Vacía todo el carrito de un usuario (para después del checkout).
   */
  async clearCart(userId) {
    try {
      await sql`DELETE FROM cart_items WHERE user_id = ${userId}`;
      return { success: true };
    } catch (error) {
      console.error('Database Error [clearCart]:', error);
      throw new Error("No se pudo vaciar el carrito.");
    }
  }
};
