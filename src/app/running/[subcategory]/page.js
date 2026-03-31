"use client";
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { PRODUCTS } from "@/data/products.js";

export default function GenericSubcategoryPage() {
  const params = useParams();
  const subcategory = params.subcategory;
  
  // Determinamos la categoría base basándonos en la ruta (running, gym, futbol)
  // Aunque en este caso el archivo está dentro de cada carpeta, podemos hacerlo genérico
  const runningProducts = PRODUCTS.filter(p => {
    const isCategory = p.category === 'running';
    const isSub = p.subCategory === subcategory;
    return isCategory && isSub;
  });

  return (
    <div className="running-grid-area">
      <div className="product-grid running-grid">
        {runningProducts.length > 0 ? (
          runningProducts.map((product) => (
            <article key={product.id} className="product-card">
              <Link href={`/product/${product.id}`}>
                <div className="card-image-wrapper">
                  <span className="badge tech">{product.subCategory?.toUpperCase()}</span>
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
          ))
        ) : (
          <p className="empty-message" style={{gridColumn: '1/-1', textAlign: 'center', opacity: 0.5, marginTop: '4rem'}}>
            No hay artículos en la categoría {subcategory?.toUpperCase()}.
          </p>
        )}
      </div>
    </div>
  );
}
