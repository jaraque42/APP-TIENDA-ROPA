/**
 * AERDNA ORDER DATABASE SERVICE (NEON SERVERLESS)
 * 📂 Ubicación: src/lib/order-db.js
 */
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL || process.env.POSTGRES_URL);

export const orderDb = {
  /**
   * Crea un pedido completo con sus ítems y vacía el carrito.
   */
  async createOrder(userId, cartItems, shippingInfo, cardLastFour, total) {
    try {
      // 1. Crear el pedido principal
      const orderResult = await sql`
        INSERT INTO orders (user_id, total, shipping_name, shipping_address, shipping_city, shipping_zip, card_last_four)
        VALUES (${userId}, ${total}, ${shippingInfo.name}, ${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.zip}, ${cardLastFour})
        RETURNING *
      `;
      const order = orderResult[0];

      // 2. Insertar cada ítem del carrito como línea del pedido
      for (const item of cartItems) {
        await sql`
          INSERT INTO order_items (order_id, product_id, product_name, product_image, price, size, quantity)
          VALUES (${order.id}, ${item.product_id || item.id}, ${item.product_name || item.name}, ${item.product_image || item.image}, ${item.price}, ${item.size}, ${item.quantity})
        `;
      }

      // 3. Vaciar el carrito del usuario
      await sql`DELETE FROM cart_items WHERE user_id = ${userId}`;

      return order;
    } catch (error) {
      console.error('Database Error [createOrder]:', error);
      throw new Error("No se pudo crear el pedido.");
    }
  },

  /**
   * Obtiene todos los pedidos de un usuario.
   */
  async getByUserId(userId) {
    try {
      const orders = await sql`
        SELECT * FROM orders WHERE user_id = ${userId} ORDER BY created_at DESC
      `;
      return orders;
    } catch (error) {
      console.error('Database Error [getByUserId]:', error);
      return [];
    }
  },

  /**
   * Obtiene los ítems de un pedido específico.
   */
  async getOrderItems(orderId) {
    try {
      const items = await sql`
        SELECT * FROM order_items WHERE order_id = ${orderId} ORDER BY created_at ASC
      `;
      return items;
    } catch (error) {
      console.error('Database Error [getOrderItems]:', error);
      return [];
    }
  }
};
