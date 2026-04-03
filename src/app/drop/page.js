"use client";
import Link from 'next/link';
import ProductImage from '@/components/ProductImage';
import { PRODUCTS } from "@/data/products.js";

export default function DropPage() {
  const dropProducts = PRODUCTS.filter(p => p.category === 'drop');

  return (
    <main className="drop-exclusive-page">
      <header className="drop-hero">
        <div className="hero-overlay"></div>
        <div className="drop-hero-content">
          <span className="drop-tag">ACCESO RESTRINGIDO</span>
          <h1 className="display-text silver-text">DROP <br/><span className="highlight">EXCLUSIVO</span></h1>
          <p className="drop-timer">PRÓXIMO LANZAMIENTO EN: <span className="highlight">00:00:00</span></p>
        </div>
      </header>

      <section className="drop-catalog">
        <div className="product-grid drop-grid">
          {dropProducts.map((product) => (
            <article key={product.id} className="product-card exclusive-card">
              <Link href={`/product/${product.id}`}>
                <div className="card-image-wrapper">
                  <span className="badge limited">LIMITED EDITION</span>
                  <ProductImage product={product} />
                  <div className="card-overlay highlight-overlay">
                    <span className="view-details">RECLAMAR ARTÍCULO</span>
                  </div>
                </div>
                <div className="card-info">
                  <div className="card-header-flex">
                    <h3>{product.name}</h3>
                    <span className="serial-number">#00{Math.floor(Math.random() * 99 + 1)}</span>
                  </div>
                  <p className="price">€{product.price.toFixed(2)}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <footer className="drop-footer">
        <p>AUTENTICIDAD GARANTIZADA MEDIANTE PROTOCOLO AERDNA-NFC.</p>
      </footer>
    </main>
  );
}
