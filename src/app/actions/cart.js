"use server";
/**
 * AERDNA CART ENGINE (SERVER ACTIONS)
 * 📂 Ubicación: src/app/actions/cart.js
 * 
 * Operaciones del carrito ejecutadas en el servidor contra Neon Database.
 */
import { cartDb } from "@/lib/cart-db.js";

/**
 * Obtiene el carrito completo de un usuario.
 */
export async function getCartAction(userId) {
  const items = await cartDb.getByUserId(userId);
  return { success: true, items };
}

/**
 * Añade un producto al carrito del usuario.
 */
export async function addToCartAction(userId, product, selectedSize) {
  try {
    await cartDb.addItem(userId, product, selectedSize);
    const items = await cartDb.getByUserId(userId);
    return { success: true, items };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Actualiza la cantidad de un ítem en el carrito.
 */
export async function updateQuantityAction(userId, cartKey, delta) {
  try {
    await cartDb.updateQuantity(userId, cartKey, delta);
    const items = await cartDb.getByUserId(userId);
    return { success: true, items };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Elimina un ítem del carrito.
 */
export async function removeFromCartAction(userId, cartKey) {
  try {
    await cartDb.removeItem(userId, cartKey);
    const items = await cartDb.getByUserId(userId);
    return { success: true, items };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Vacía completamente el carrito del usuario.
 */
export async function clearCartAction(userId) {
  try {
    await cartDb.clearCart(userId);
    return { success: true, items: [] };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
