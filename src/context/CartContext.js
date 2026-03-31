"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("kinetic_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing cart from localStorage", e);
      }
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("kinetic_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, selectedSize) => {
    if (!selectedSize) {
      alert("Por favor, selecciones una talla antes de añadir su artículo.");
      return;
    }

    setCartItems((prevItems) => {
      const itemKey = `${product.id}-${selectedSize}`;
      const existingItem = prevItems.find((item) => item.cartKey === itemKey);
      
      if (existingItem) {
        return prevItems.map((item) =>
          item.cartKey === itemKey ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, size: selectedSize, cartKey: itemKey, quantity: 1 }];
    });
  };

  const removeFromCart = (cartKey) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.cartKey !== cartKey));
  };

  const updateQuantity = (cartKey, delta) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.cartKey === cartKey ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        )
    );
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal }}>
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
