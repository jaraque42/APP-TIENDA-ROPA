"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext.js';
import { useCart } from '@/context/CartContext.js';
import { checkoutAction } from '@/app/actions/order.js';
import Link from 'next/link';

export default function Checkout() {
  const { currentUser } = useAuth();
  const { cartItems, cartTotal, cartCount } = useCart();
  const router = useRouter();

  const [step, setStep] = useState(1); // 1=form, 2=processing, 3=confirmed
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState('');

  const [shipping, setShipping] = useState({
    name: currentUser?.name || '',
    address: '',
    city: '',
    zip: ''
  });

  const [card, setCard] = useState({
    number: '',
    expiry: '',
    cvv: '',
    holder: ''
  });

  // Formateo de número de tarjeta (agrupa de 4 en 4)
  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 16);
    return cleaned.replace(/(.{4})/g, '$1 ').trim();
  };

  // Formateo de fecha de expiración
  const formatExpiry = (value) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length >= 3) return cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    return cleaned;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!currentUser) {
      setError('Debes iniciar sesión para completar el pedido.');
      return;
    }

    if (cartItems.length === 0) {
      setError('Tu carrito está vacío.');
      return;
    }

    // Paso 2: Animación de procesamiento
    setStep(2);

    const cardLastFour = card.number.replace(/\s/g, '').slice(-4);

    const result = await checkoutAction(
      currentUser.id,
      cartItems,
      shipping,
      cardLastFour,
      cartTotal
    );

    if (result.success) {
      setOrderId(result.order.id);
      // Pequeña pausa extra para la animación
      setTimeout(() => setStep(3), 1500);
    } else {
      setError(result.error || 'Error al procesar el pago.');
      setStep(1);
    }
  };

  // --- PASO 2: PANTALLA DE PROCESAMIENTO ---
  if (step === 2) {
    return (
      <main className="checkout-processing">
        <div className="processing-card">
          <div className="spinner-ring"></div>
          <h2 className="display-text" style={{ fontSize: '1.5rem', marginTop: '2rem' }}>
            PROCESANDO <span className="highlight">PAGO</span>
          </h2>
          <p style={{ marginTop: '1rem', color: 'var(--on-surface-muted)' }}>
            Verificando datos de tu tarjeta •••• {card.number.replace(/\s/g, '').slice(-4)}
          </p>
          <div className="processing-steps">
            <span className="pstep active">Verificando identidad</span>
            <span className="pstep">Autorizando banco</span>
            <span className="pstep">Confirmando pedido</span>
          </div>
        </div>
      </main>
    );
  }

  // --- PASO 3: CONFIRMACIÓN DE PEDIDO ---
  if (step === 3) {
    return (
      <main className="checkout-confirmed">
        <div className="confirmed-card">
          <div className="checkmark-circle">
            <svg viewBox="0 0 52 52" className="checkmark-svg">
              <circle cx="26" cy="26" r="25" fill="none" className="checkmark-circle-bg" />
              <path fill="none" d="M14 27l7 7 16-16" className="checkmark-check" />
            </svg>
          </div>
          <h2 className="display-text" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginTop: '2rem' }}>
            PEDIDO <span className="highlight">CONFIRMADO</span>
          </h2>
          <p style={{ marginTop: '1rem', color: 'var(--on-surface-muted)', maxWidth: '400px' }}>
            Tu equipamiento está en camino. Recibirás un email de confirmación en <strong style={{color: '#fff'}}>{shipping.name}</strong>.
          </p>
          <div className="order-ref">
            <span style={{ color: 'var(--on-surface-muted)', fontSize: '0.8rem' }}>REFERENCIA DE PEDIDO</span>
            <span className="highlight" style={{ fontFamily: 'var(--font-label)', fontSize: '0.9rem', letterSpacing: '0.05em' }}>
              {orderId?.slice(0, 8).toUpperCase()}
            </span>
          </div>
          <div className="order-ref">
            <span style={{ color: 'var(--on-surface-muted)', fontSize: '0.8rem' }}>TOTAL CARGADO</span>
            <span style={{ color: '#fff', fontFamily: 'var(--font-display)', fontSize: '1.3rem' }}>
              €{cartTotal.toFixed(2)}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/" className="btn-primary">VOLVER A LA TIENDA</Link>
            <Link href="/pedidos" className="btn-secondary-link">VER MIS PEDIDOS</Link>
          </div>
        </div>
      </main>
    );
  }

  // --- PASO 1: FORMULARIO DE CHECKOUT ---
  return (
    <main className="checkout-container">

      <header className="checkout-header">
        <h1 className="display-text">SECUENCIA DE <span className="highlight">PAGO</span></h1>
        <p style={{ color: 'var(--on-surface-muted)' }}>{cartCount} artículo{cartCount !== 1 ? 's' : ''} en tu inventario táctico</p>
      </header>

      <div className="checkout-grid">

        {/* Columna izquierda: Formularios */}
        <form onSubmit={handleSubmit} className="checkout-forms">

          {error && <p style={{ color: '#ff4444', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}

          {/* Bloque: Dirección de envío */}
          <section className="checkout-section">
            <h3 className="section-label"><span className="step-number">01</span> DESTINO DE ENVÍO</h3>
            <div className="input-field">
              <label htmlFor="ship-name">Nombre completo</label>
              <input type="text" id="ship-name" placeholder="Alex Runner" required
                value={shipping.name} onChange={(e) => setShipping({ ...shipping, name: e.target.value })} />
            </div>
            <div className="input-field">
              <label htmlFor="ship-address">Dirección</label>
              <input type="text" id="ship-address" placeholder="Calle de la Velocidad, 42" required
                value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} />
            </div>
            <div className="input-row">
              <div className="input-field">
                <label htmlFor="ship-city">Ciudad</label>
                <input type="text" id="ship-city" placeholder="Madrid" required
                  value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} />
              </div>
              <div className="input-field">
                <label htmlFor="ship-zip">Código Postal</label>
                <input type="text" id="ship-zip" placeholder="28001" required
                  value={shipping.zip} onChange={(e) => setShipping({ ...shipping, zip: e.target.value })} />
              </div>
            </div>
          </section>

          {/* Bloque: Tarjeta de pago */}
          <section className="checkout-section">
            <h3 className="section-label"><span className="step-number">02</span> DATOS DE PAGO</h3>
            <div className="credit-card-preview">
              <div className="card-chip"></div>
              <p className="card-number-preview">{card.number || '•••• •••• •••• ••••'}</p>
              <div className="card-bottom">
                <span>{card.holder || 'NOMBRE DEL TITULAR'}</span>
                <span>{card.expiry || 'MM/AA'}</span>
              </div>
              <div className="card-badge">DEMO</div>
            </div>
            <div className="input-field">
              <label htmlFor="card-number">Número de tarjeta</label>
              <input type="text" id="card-number" placeholder="4242 4242 4242 4242" required
                value={card.number} onChange={(e) => setCard({ ...card, number: formatCardNumber(e.target.value) })}
                maxLength="19" />
            </div>
            <div className="input-field">
              <label htmlFor="card-holder">Titular</label>
              <input type="text" id="card-holder" placeholder="ALEX RUNNER" required
                value={card.holder} onChange={(e) => setCard({ ...card, holder: e.target.value.toUpperCase() })} />
            </div>
            <div className="input-row">
              <div className="input-field">
                <label htmlFor="card-expiry">Fecha de expiración</label>
                <input type="text" id="card-expiry" placeholder="12/28" required
                  value={card.expiry} onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
                  maxLength="5" />
              </div>
              <div className="input-field">
                <label htmlFor="card-cvv">CVV</label>
                <input type="password" id="card-cvv" placeholder="•••" required
                  value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                  maxLength="3" />
              </div>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--on-surface-muted)', marginTop: '0.5rem' }}>
              🔒 Pasarela de demostración. No se realizará ningún cargo real.
            </p>
          </section>

          <button type="submit" className="btn-primary checkout-pay-btn">
            CONFIRMAR Y PAGAR €{cartTotal.toFixed(2)}
          </button>

        </form>

        {/* Columna derecha: Resumen del pedido */}
        <aside className="checkout-summary">
          <h3 className="section-label">RESUMEN DEL PEDIDO</h3>
          <div className="checkout-items-list">
            {cartItems.map((item) => (
              <div key={item.cartKey} className="checkout-item-row">
                <img src={item.image} alt={item.name} className="checkout-item-img" />
                <div className="checkout-item-info">
                  <p className="checkout-item-name">{item.name}</p>
                  <p className="checkout-item-meta">Talla {item.size} · x{item.quantity}</p>
                </div>
                <p className="checkout-item-price">€{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="checkout-totals">
            <div className="checkout-total-line">
              <span>Subtotal</span>
              <span>€{cartTotal.toFixed(2)}</span>
            </div>
            <div className="checkout-total-line">
              <span>Envío Express</span>
              <span style={{ color: 'var(--primary-container)' }}>GRATIS</span>
            </div>
            <div className="checkout-total-line total-final">
              <span>TOTAL</span>
              <span className="highlight">€{cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </aside>

      </div>
    </main>
  );
}
