"use client";
import React, { useState, use } from "react";
import { useCart } from "@/context/CartContext.js";
import { getProductById } from "@/data/products.js";
import Link from 'next/link';
import ProductImage from '@/components/ProductImage';

export default function ProductDetail({ params }) {
  const { id } = use(params);
  const product = getProductById(id);
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);

  if (!product) {
    return (
      <main className="product-container" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '2rem'}}>
        <h1 className="display-text">PRODUCTO <span className="highlight">NO ENCONTRADO</span></h1>
        <Link href="/" className="btn-primary">VOLVER AL CATÁLOGO</Link>
      </main>
    );
  }

  return (
    <main className="product-container">
      {/* Lado Izquierdo: Imagen expansiva del artículo */}
      <section className="product-image-section">
        <ProductImage product={product} />
      </section>

      {/* Lado Derecho: Detalles Técnicos */}
      <section className="product-details-section">
        <div className="details-wrapper">
          
          <div className="badges">
            <Link href="/" style={{color: 'var(--on-surface-muted)', fontSize: '0.7rem', display: 'block', marginBottom: '1rem'}}>← VOLVER AL CATÁLOGO</Link>
            {product.category && <span className="badge tech">{product.category}</span>}
            <span className="badge new" style={{ backgroundColor: 'var(--secondary)' }}>PREMIUM</span>
          </div>

          <h1 className="product-title">{product.name.split(' ').slice(0, -1).join(' ')} <br/><span className="highlight">{product.name.split(' ').pop()}</span></h1>
          <p className="product-price">€{product.price.toFixed(2)}</p>
          
          <p className="product-description">
            {product.description}
          </p>

          <div className="selector-group">
            <h3 className="selector-title">SELECCIONA TALLA</h3>
            <div className="size-chips">
              {product.sizes.map((size) => (
                <button 
                  key={size} 
                  className={`chip ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button 
            className="btn-primary product-action"
            onClick={() => addToCart(product, selectedSize)}
          >
            AÑADIR AL CARRITO
          </button>
          
          <div className="tech-specs">
            <h4>ESPECIFICACIONES TÉCNICAS</h4>
            <ul>
              {product.specs.map((spec, index) => (
                <li key={index}><strong>{spec.label}:</strong> {spec.value}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
