"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("aerdna_cookie_consent");
    if (!consent) {
      // Pequeño delay para que aparezca suavemente al cargar
      setTimeout(() => setVisible(true), 1500);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("aerdna_cookie_consent", "accepted");
    setAnimating(true);
    setTimeout(() => setVisible(false), 400);
  };

  const reject = () => {
    localStorage.setItem("aerdna_cookie_consent", "rejected");
    setAnimating(true);
    setTimeout(() => setVisible(false), 400);
  };

  if (!visible) return null;

  return (
    <div className={`cookie-banner ${animating ? 'closing' : 'entering'}`}>
      <div className="cookie-content">
        <div className="cookie-icon">🍪</div>
        <div className="cookie-text">
          <p className="cookie-title">Tu privacidad es importante</p>
          <p className="cookie-desc">
            Utilizamos cookies propias y de sesión para gestionar tu cuenta, carrito de compras y mejorar tu experiencia de navegación. 
            No utilizamos cookies de terceros con fines publicitarios. 
            Puedes leer nuestra{" "}
            <Link href="/politica-cookies" className="cookie-link">
              política de cookies
            </Link>{" "}
            para más información.
          </p>
        </div>
      </div>
      <div className="cookie-actions">
        <button onClick={reject} className="cookie-btn-reject">
          SOLO ESENCIALES
        </button>
        <button onClick={accept} className="cookie-btn-accept">
          ACEPTAR TODAS
        </button>
      </div>
    </div>
  );
}
