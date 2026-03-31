"use client";
import Link from 'next/link';
import { PRODUCTS } from "@/data/products.js";

export default function Home() {
  return (
    <main>
      {/* Hero Banner Asimétrico */}
      <header className="home-hero">
        <div className="hero-bg-image">
          <img src="https://images.unsplash.com/photo-1571216300806-6962f90a19fa?q=80&w=2072&auto=format&fit=crop" alt="Corredor sprintando" />
        </div>
        <div className="hero-content">
          <h1 className="display-text">ROMPE <br/><span className="highlight">TUS LÍMITES</span></h1>
          <p className="hero-subtext">Descubre la colección AERDNA High-Performance. Ingeniería pura para tu máximo nivel.</p>
          <Link href="#catalog" className="btn-primary" style={{ display: 'inline-block', marginTop: '2rem', width: 'auto', padding: '1rem 3rem' }}>
            VER COLECCIÓN
          </Link>
        </div>
      </header>

      {/* Catálogo de Productos (Layout Staggered) */}
      <section id="catalog" className="catalog-section">
        <h2 className="section-title">EQUIPAMIENTO TÉCNICO</h2>
        
        <div className="product-grid">
          {PRODUCTS.map((product) => (
            <article key={product.id} className={`product-card ${product.featured ? 'featured' : ''}`}>
              <Link href={`/product/${product.id}`}>
                <div className="card-image-wrapper">
                  {product.category && <span className={`badge ${product.category === 'NUEVO DROP' ? 'new' : 'tech'}`}>{product.category}</span>}
                  <img src={product.image} alt={product.name} />
                  <div className="card-overlay">
                    <span className="view-details">VER DETALLES</span>
                  </div>
                </div>
                <div className="card-info">
                  <h3>{product.name}</h3>
                  <p className="price">€{product.price.toFixed(2)}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <p>THE AERDNA LENS © 2026. High-Performance Editorial.</p>
      </footer>
    </main>
  );
}
