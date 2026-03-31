"use client";
import React from 'react';
import { useAuth } from '@/context/AuthContext.js';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Perfil() {
  const { currentUser, logout, loading } = useAuth();
  const router = useRouter();

  if (loading) return null;

  if (!currentUser) {
    if (typeof window !== "undefined") {
      router.push('/login');
    }
    return null;
  }

  return (
    <main className="product-container" style={{paddingTop: '100px', background: 'var(--surface)'}}>
      <div className="product-details-section" style={{maxWidth: '800px', margin: '0 auto', background: 'var(--surface-container)', borderRadius: '8px', padding: '4rem'}}>
        <div className="details-wrapper">
          <div className="badges">
            <span className="badge new">ATLETA ACTIVO</span>
            <span className="badge tech">{currentUser.role}</span>
          </div>
          
          <h1 className="display-text" style={{fontSize: '3.5rem'}}>{currentUser.name.toUpperCase()}</h1>
          <p style={{color: 'var(--on-surface-muted)', fontSize: '1.2rem', marginTop: '1rem'}}>
            STATUS: <span style={{color: 'var(--primary-container)'}}>OPERATIVO</span>
          </p>

          <div className="tech-specs" style={{marginTop: '3rem', borderTop: '0.5px solid rgba(255,255,255,0.1)'}}>
            <h4 style={{marginTop: '2rem'}}>DATOS DE RECLUTAMIENTO</h4>
            <ul style={{listStyle: 'none', padding: 0}}>
              <li style={{display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                <span>Email de comunicaciones</span>
                <strong>{currentUser.email}</strong>
              </li>
              <li style={{display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                <span>ID de Recluta</span>
                <strong>#{currentUser.id.slice(-6)}</strong>
              </li>
              <li style={{display: 'flex', justifyContent: 'space-between', padding: '1rem 0'}}>
                <span>Nivel de Acceso</span>
                <strong style={{color: 'var(--primary-container)'}}>ALPHA PR</strong>
              </li>
            </ul>
          </div>

          <div style={{marginTop: '4rem', display: 'flex', gap: '1.5rem'}}>
            <Link href="/" className="btn-primary" style={{flex: 1, textAlign: 'center'}}>VOLVER AL CATÁLOGO</Link>
            <button 
              onClick={() => {
                logout();
                router.push('/');
              }} 
              style={{flex: 1, background: 'transparent', border: '1px solid #ff4444', color: '#ff4444', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold'}}
            >
              SALIR DE LA BASE
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
