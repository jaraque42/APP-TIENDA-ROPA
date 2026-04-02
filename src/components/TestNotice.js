"use client";
import { useState, useEffect } from "react";

export default function TestNotice() {
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const closed = localStorage.getItem("aerdna_test_notice_closed");
    if (!closed) {
      // Aparece un poco después que el contenido para llamar la atención
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem("aerdna_test_notice_closed", "true");
    setAnimating(true);
    setTimeout(() => setVisible(false), 500);
  };

  if (!visible) return null;

  return (
    <div className={`test-notice-overlay ${animating ? 'fade-out' : 'fade-in'}`}>
      <div className="test-notice-card">
        <div className="test-notice-header">
          <div className="test-notice-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <span className="test-notice-title">ENTORNO DE PRUEBAS</span>
        </div>
        <div className="test-notice-body">
          <p>Esta es una plataforma de **demostración técnica**. Los productos, precios y procesos de compra son ficticios.</p>
          <p className="test-notice-highlight">No se realizan envíos reales ni se procesan pagos de ningún tipo.</p>
        </div>
        <button onClick={dismiss} className="test-notice-btn">
          ENTENDIDO
        </button>
      </div>
    </div>
  );
}
