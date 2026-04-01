"use client";
import Link from 'next/link';
import { useState } from 'react';
import AerdnaLogo from './AerdnaLogo.jsx';
import { useCart } from "@/context/CartContext.js";
import { useAuth } from "@/context/AuthContext.js";

export default function Navbar() {
  const { cartCount } = useCart();
  const { currentUser, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="kinetic-nav">
        <div className="nav-brand">
          <Link href="/" className="logo-link" onClick={closeMenu}>
            <AerdnaLogo className="w-32 h-auto" />
          </Link>
        </div>

        {/* Desktop nav links */}
        <div className="nav-links nav-links-desktop">
          <Link href="/">CATÁLOGO</Link>
          <Link href="/running">RUNNING</Link>
          <Link href="/gym">GYM/TRAINING</Link>
          <Link href="/futbol">FÚTBOL</Link>
          <Link href="/drop">DROP EXCLUSIVO</Link>
        </div>

        {/* Desktop actions */}
        <div className="nav-actions nav-actions-desktop">
          {currentUser ? (
            <div style={{display: 'flex', alignItems: 'center', gap: '1.5rem'}}>
              <Link href="/perfil" className="nav-btn" style={{color: 'var(--primary-container)', fontWeight: '700'}}>
                {currentUser.name.toUpperCase()}
              </Link>
              <button onClick={logout} className="nav-btn" style={{background: 'none', border: '1px solid rgba(255,255,255,0.2)', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem'}}>
                SALIR
              </button>
            </div>
          ) : (
            <Link href="/register" className="nav-btn">CUENTA</Link>
          )}
          <Link href="/cart" className={`cart-btn ${cartCount > 0 ? 'active' : ''}`}>CARRITO ({cartCount})</Link>
        </div>

        {/* Mobile: Cart + Hamburger */}
        <div className="nav-mobile-right">
          <Link href="/cart" className={`cart-btn ${cartCount > 0 ? 'active' : ''}`} onClick={closeMenu}>
            🛒 {cartCount > 0 && <span className="mobile-cart-count">{cartCount}</span>}
          </Link>
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile slide-in menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-links">
          <Link href="/" onClick={closeMenu}>CATÁLOGO</Link>
          <Link href="/running" onClick={closeMenu}>RUNNING</Link>
          <Link href="/gym" onClick={closeMenu}>GYM / TRAINING</Link>
          <Link href="/futbol" onClick={closeMenu}>FÚTBOL</Link>
          <Link href="/drop" onClick={closeMenu}>DROP EXCLUSIVO</Link>
          <Link href="/pedidos" onClick={closeMenu}>MIS PEDIDOS</Link>
        </div>
        <div className="mobile-menu-footer">
          {currentUser ? (
            <>
              <p className="mobile-user-name">{currentUser.name}</p>
              <button onClick={() => { logout(); closeMenu(); }} className="btn-primary" style={{ width: '100%', fontSize: '0.85rem', padding: '0.9rem' }}>
                CERRAR SESIÓN
              </button>
            </>
          ) : (
            <Link href="/register" onClick={closeMenu} className="btn-primary" style={{ display: 'block', textAlign: 'center', fontSize: '0.85rem', padding: '0.9rem' }}>
              CREAR CUENTA
            </Link>
          )}
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && <div className="mobile-overlay" onClick={closeMenu}></div>}
    </>
  );
}
