"use client";
import Link from 'next/link';
import AerdnaLogo from './AerdnaLogo.jsx';
import { useCart } from "@/context/CartContext.js";
import { useAuth } from "@/context/AuthContext.js";

export default function Navbar() {
  const { cartCount } = useCart();
  const { currentUser, logout } = useAuth();

  return (
    <nav className="kinetic-nav">
      <div className="nav-brand">
        <Link href="/" className="logo-link">
          <AerdnaLogo className="w-32 h-auto" />
        </Link>
      </div>
      <div className="nav-links">
        <Link href="/">CATÁLOGO</Link>
        <Link href="/running">RUNNING</Link>
        <Link href="/gym">GYM/TRAINING</Link>
        <Link href="/futbol">FÚTBOL</Link>
        <Link href="/drop">DROP EXCLUSIVO</Link>
      </div>
      <div className="nav-actions">
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
    </nav>
  );
}
