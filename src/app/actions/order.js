"use server";
/**
 * AERDNA ORDER ENGINE (SERVER ACTIONS)
 * 📂 Ubicación: src/app/actions/order.js
 */
import { orderDb } from "@/lib/order-db.js";

/**
 * Procesa el checkout: simula pago y guarda el pedido en Neon.
 */
export async function checkoutAction(userId, cartItems, shippingInfo, cardLastFour, total) {
  try {
    // Simulación de procesamiento de pago (2 segundos)
    await new Promise(resolve => setTimeout(resolve, 2000));

    const order = await orderDb.createOrder(userId, cartItems, shippingInfo, cardLastFour, total);
    return { success: true, order };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Obtiene el historial de pedidos de un usuario.
 */
export async function getOrdersAction(userId) {
  const orders = await orderDb.getByUserId(userId);
  return { success: true, orders };
}

/**
 * Obtiene los detalles de un pedido.
 */
export async function getOrderItemsAction(orderId) {
  const items = await orderDb.getOrderItems(orderId);
  return { success: true, items };
}
