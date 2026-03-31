"use client";
import React from 'react';
import Link from 'next/link';
import { PRODUCTS } from "@/data/products.js";

export default function RunningPage() {
  const runningProducts = PRODUCTS.filter(p => p.category === 'running');

  return (
    <div className="product-grid running-grid">
      {runningProducts.map((product) => (
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
      ))}
    </div>
  );
}
