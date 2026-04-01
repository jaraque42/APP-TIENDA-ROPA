"use client";
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext.js';
import { useRouter } from 'next/navigation';

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login(formData.email, formData.password);
      router.push('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-container">
      
      {/* Lado Izquierdo: Visual Asimétrico */}
      <section className="auth-hero">
        <div className="auth-overlay"></div>
        <img 
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop" 
          alt="Gimnasio de alto rendimiento" 
        />
        <div className="auth-hero-content">
          <span className="badge tech" style={{marginBottom: "1rem"}}>ACCESO RESTRINGIDO</span>
          <h1 className="display-text" style={{fontSize: "clamp(3rem, 6vw, 5rem)", lineHeight: "0.9"}}>
            ESTADO de<br/><span className="highlight">MISIÓN</span>
          </h1>
          <p>Retoma tu entrenamiento. Tus estadísticas y drops exclusivos te esperan dentro.</p>
        </div>
      </section>

      {/* Lado Derecho: Formulario */}
      <section className="auth-form-section">
        <div className="auth-form-wrapper">
          <header className="auth-header">
            <h2 className="display-text">INICIAR <span className="highlight">SESIÓN</span></h2>
            <p>Introduce tus credenciales de atleta para acceder a la base.</p>
          </header>

          <form onSubmit={handleSubmit} className="kinetic-form">
            {error && <p style={{color: '#ff4444', marginBottom: '1rem', fontSize: '0.9rem'}}>{error}</p>}
            
            <div className="input-field">
              <label htmlFor="email">Email de Atleta</label>
              <input 
                type="email" 
                id="email" 
                placeholder="atleta@aerdna.com" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="input-field">
              <label htmlFor="password">Código de Acceso</label>
              <input 
                type="password" 
                id="password" 
                placeholder="••••••••" 
                required 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <button type="submit" className="btn-primary" style={{width: '100%', marginTop: '1rem'}} disabled={loading}>
              {loading ? 'VERIFICANDO...' : 'ACCEDER A LA BASE'}
            </button>
          </form>

          <div className="auth-footer-link">
            <p>¿Aún no tienes ID? <Link href="/register">Regístrate en la Élite</Link></p>
          </div>
        </div>
      </section>

    </main>
  );
}
