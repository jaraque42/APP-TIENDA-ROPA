import React from 'react';


export default function ProductImage({ product, className = "" }) {
  return (
    <div className={`product-image-container ${className}`} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <img 
        src={product.image} 
        alt={product.name} 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      />
      {product.hasCssLogo && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '35%',
          opacity: 0.9,
          zIndex: 5,
          transform: 'translate(-50%, -50%) rotate(-5deg)', /* Center and slight tilt */
          pointerEvents: 'none' /* ensure it doesn't block clicks */
        }}>
          <img src="/logo-dark.png" alt="Logo" style={{ width: '100%', height: 'auto' }} />
        </div>
      )}
    </div>
  );
}
