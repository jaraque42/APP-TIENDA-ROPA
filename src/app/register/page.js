"use client";
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext.js';
import { useRouter } from 'next/navigation';

export default function Register() {
  const { register } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    try {
      register(formData);
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="auth-container">
      
      {/* Lado Izquierdo: Visual Asimétrico de Alto Impacto */}
      <section className="auth-hero">
        <div className="auth-overlay"></div>
        <img 
          src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop" 
          alt="Atleta entrenando intensamente" 
        />
        <div className="auth-hero-content">
          <span className="badge new" style={{marginBottom: "1rem"}}>NUEVO RECLUTA</span>
          <h1 className="display-text" style={{fontSize: "clamp(3rem, 6vw, 5rem)", lineHeight: "0.9"}}>
            ROMPE<br/><span className="highlight">EL MOLDE</span>
          </h1>
          <p>Únete a la plataforma definitiva para atletas de alto rendimiento. Accede a drops limitados antes que nadie.</p>
        </div>
      </section>

      {/* Lado Derecho: Formulario Estilizado */}
      <section className="auth-form-section">
        <div className="auth-form-wrapper">
          <header className="auth-header">
            <h2 className="display-text">UNIRSE AL <span className="highlight">EQUIPO</span></h2>
            <p>Ingresa tus datos tácticos para iniciar tu sesión operativa.</p>
          </header>

          {success ? (
            <div className="success-message" style={{padding: '2rem', background: 'rgba(207,252,0,0.1)', border: '1px solid var(--primary-container)', borderRadius: '4px', textAlign: 'center'}}>
              <h3 style={{color: 'var(--primary-container)', marginBottom: '1rem'}}>REGISTRO EXITOSO</h3>
              <p>Tu ID de atleta ha sido activado. Redirigiendo a la base...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="kinetic-form">
              {error && <p style={{color: '#ff4444', marginBottom: '1rem', fontSize: '0.9rem'}}>{error}</p>}
              
              <div className="input-field">
                <label htmlFor="name">ID de Atleta (Nombre)</label>
                <input 
                  type="text" 
                  id="name" 
                  placeholder="Ej. Alex Runner" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="input-field">
                <label htmlFor="email">Comunicaciones (Email)</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="alex@aerdna.com" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="input-field">
                <label htmlFor="password">Código de Acceso (Contraseña)</label>
                <input 
                  type="password" 
                  id="password" 
                  placeholder="••••••••" 
                  required 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>

              <button type="submit" className="btn-primary" style={{width: '100%', marginTop: '1rem'}}>
                CONFIRMAR INGRESA
              </button>
            </form>
          )}

          <div className="auth-footer-link">
            <p>¿Ya tienes credenciales? <Link href="/login">Accede a la base</Link></p>
          </div>
        </div>
      </section>

    </main>
  );
}
