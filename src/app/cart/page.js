"use client";
import { useCart } from "@/context/CartContext.js";
import Link from 'next/link';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <main className="cart-container" style={{paddingTop: "20px"}}>
      
      <header className="cart-header">
        <h1 className="display-text">REVISIÓN DE <span className="highlight">EQUIPAMIENTO</span></h1>
      </header>

      <div className="cart-content">
        
        {/* Lista de Ítems */}
        <section className="cart-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart" style={{textAlign: 'center', padding: '3rem'}}>
              <p style={{fontSize: '1.2rem', marginBottom: '2rem'}}>Tu inventario táctico está vacío.</p>
              <Link href="/" className="btn-primary">EXPLORAR CATÁLOGO</Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <article key={item.cartKey} className="cart-line-item">
                <div className="cart-img">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <h2>{item.name} <span className="badge tech" style={{fontSize:'0.6rem', padding:'0.15rem 0.5rem', marginLeft:'0.5rem'}}>TALLA {item.size}</span></h2>
                  <p className="sku">REF: {item.id.toUpperCase()}</p>
                  <div className="quantity-control">
                    <button className="ghost-btn" onClick={() => updateQuantity(item.cartKey, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button className="ghost-btn" onClick={() => updateQuantity(item.cartKey, 1)}>+</button>
                    
                    <button 
                      className="remove-btn" 
                      onClick={() => removeFromCart(item.cartKey)}
                      style={{marginLeft: '2rem', background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline'}}
                    >
                      ELIMINAR
                    </button>
                  </div>
                </div>
                <div className="cart-item-price">
                  <p>€{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </article>
            ))
          )}
        </section>

        {/* Resumen del Pedido (Checkout) */}
        {cartItems.length > 0 && (
          <aside className="cart-summary">
            <h3>DESGLOSE TÁCTICO</h3>
            
            <div className="summary-line">
              <span>Subtotal Equipamiento</span>
              <span>€{cartTotal.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Logística Express</span>
              <span>€0.00</span>
            </div>
            <div className="summary-line total-line">
              <span>TOTAL</span>
              <span className="highlight">€{cartTotal.toFixed(2)}</span>
            </div>

            <button className="btn-primary checkout-btn" onClick={() => alert('Iniciando pasarela de pago segura de alta velocidad.')}>INICIAR SECUENCIA DE PAGO</button>
            
            <p className="security-note">
              Transacción cifrada militarmente. Devoluciones garantizadas por 30 días si el producto no mejora tus tiempos.
            </p>
          </aside>
        )}
      </div>
    </main>
  );
}
