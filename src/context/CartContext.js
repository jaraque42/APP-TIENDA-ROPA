"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext.js";
import {
  getCartAction,
  addToCartAction,
  updateQuantityAction,
  removeFromCartAction,
} from "@/app/actions/cart.js";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- Helpers para mapear datos de la BD al formato del frontend ---
  const mapDbItems = (dbItems) =>
    dbItems.map((item) => ({
      id: item.product_id,
      name: item.product_name,
      image: item.product_image,
      price: parseFloat(item.price),
      size: item.size,
      quantity: item.quantity,
      cartKey: item.cart_key,
    }));

  // --- Cargar carrito al montar o al cambiar de usuario ---
  useEffect(() => {
    if (currentUser?.id) {
      // Usuario logueado: cargar carrito desde Neon DB
      setLoading(true);
      getCartAction(currentUser.id).then((result) => {
        if (result.success) {
          setCartItems(mapDbItems(result.items));
        }
        setLoading(false);
      });
    } else {
      // Sin login: cargar desde localStorage
      const savedCart = localStorage.getItem("aerdna_cart");
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (e) {
          console.error("Error parsing cart from localStorage", e);
        }
      } else {
        setCartItems([]);
      }
    }
  }, [currentUser]);

  // --- Guardar en localStorage cuando NO hay usuario logueado ---
  useEffect(() => {
    if (!currentUser) {
      localStorage.setItem("aerdna_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, currentUser]);

  // --- AÑADIR AL CARRITO ---
  const addToCart = useCallback(
    async (product, selectedSize) => {
      if (!selectedSize) {
        alert("Por favor, selecciona una talla antes de añadir tu artículo.");
        return;
      }

      if (currentUser?.id) {
        // Guardar en base de datos
        const result = await addToCartAction(currentUser.id, product, selectedSize);
        if (result.success) {
          setCartItems(mapDbItems(result.items));
        }
      } else {
        // Guardar en localStorage (modo invitado)
        setCartItems((prevItems) => {
          const itemKey = `${product.id}-${selectedSize}`;
          const existingItem = prevItems.find((item) => item.cartKey === itemKey);

          if (existingItem) {
            return prevItems.map((item) =>
              item.cartKey === itemKey
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }
          return [
            ...prevItems,
            { ...product, size: selectedSize, cartKey: itemKey, quantity: 1 },
          ];
        });
      }
    },
    [currentUser]
  );

  // --- ELIMINAR ITEM ---
  const removeFromCart = useCallback(
    async (cartKey) => {
      if (currentUser?.id) {
        const result = await removeFromCartAction(currentUser.id, cartKey);
        if (result.success) {
          setCartItems(mapDbItems(result.items));
        }
      } else {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.cartKey !== cartKey)
        );
      }
    },
    [currentUser]
  );

  // --- ACTUALIZAR CANTIDAD ---
  const updateQuantity = useCallback(
    async (cartKey, delta) => {
      if (currentUser?.id) {
        const result = await updateQuantityAction(currentUser.id, cartKey, delta);
        if (result.success) {
          setCartItems(mapDbItems(result.items));
        }
      } else {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.cartKey === cartKey
              ? { ...item, quantity: Math.max(1, item.quantity + delta) }
              : item
          )
        );
      }
    },
    [currentUser]
  );

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        cartTotal,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
