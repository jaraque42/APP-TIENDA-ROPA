"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext.js';
import { getOrdersAction, getOrderItemsAction } from '@/app/actions/order.js';
import Link from 'next/link';

export default function Pedidos() {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser?.id) {
      getOrdersAction(currentUser.id).then((result) => {
        if (result.success) setOrders(result.orders);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  const toggleOrder = async (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
      return;
    }
    setExpandedOrder(orderId);
    if (!orderItems[orderId]) {
      const result = await getOrderItemsAction(orderId);
      if (result.success) {
        setOrderItems((prev) => ({ ...prev, [orderId]: result.items }));
      }
    }
  };

  if (!currentUser) {
    return (
      <main style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <h1 className="display-text">MIS <span className="highlight">PEDIDOS</span></h1>
        <p style={{ marginTop: '2rem', color: 'var(--on-surface-muted)' }}>Debes iniciar sesión para ver tus pedidos.</p>
        <Link href="/login" className="btn-primary" style={{ marginTop: '2rem', display: 'inline-block' }}>INICIAR SESIÓN</Link>
      </main>
    );
  }

  return (
    <main style={{ padding: '6rem 2rem 4rem', maxWidth: '900px', margin: '0 auto' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 className="display-text">HISTORIAL DE <span className="highlight">MISIONES</span></h1>
        <p style={{ color: 'var(--on-surface-muted)', marginTop: '0.5rem' }}>
          {orders.length} pedido{orders.length !== 1 ? 's' : ''} registrado{orders.length !== 1 ? 's' : ''}
        </p>
      </header>

      {loading ? (
        <p style={{ color: 'var(--on-surface-muted)' }}>Cargando pedidos...</p>
      ) : orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Aún no has realizado ningún pedido.</p>
          <Link href="/" className="btn-primary">EXPLORAR CATÁLOGO</Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <article key={order.id} className="order-card" onClick={() => toggleOrder(order.id)}>
              <div className="order-card-header">
                <div>
                  <span className="badge tech" style={{ fontSize: '0.65rem', padding: '0.15rem 0.6rem' }}>
                    {order.status}
                  </span>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: '#fff', marginTop: '0.5rem' }}>
                    Pedido #{order.id.slice(0, 8).toUpperCase()}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--on-surface-muted)', marginTop: '0.25rem' }}>
                    {new Date(order.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                    {' · '} Tarjeta ····{order.card_last_four}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--primary-container)' }}>
                    €{parseFloat(order.total).toFixed(2)}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--on-surface-muted)', marginTop: '0.25rem' }}>
                    {expandedOrder === order.id ? '▲ Ocultar' : '▼ Ver detalles'}
                  </p>
                </div>
              </div>

              {expandedOrder === order.id && orderItems[order.id] && (
                <div className="order-card-items">
                  {orderItems[order.id].map((item) => (
                    <div key={item.id} className="order-item-row">
                      <img src={item.product_image} alt={item.product_name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                      <div style={{ flex: 1, marginLeft: '1rem' }}>
                        <p style={{ fontSize: '0.9rem', color: '#fff' }}>{item.product_name}</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--on-surface-muted)' }}>Talla {item.size} · x{item.quantity}</p>
                      </div>
                      <p style={{ fontFamily: 'var(--font-label)', color: '#fff' }}>€{(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  <div style={{ marginTop: '1rem', padding: '1rem 0 0', borderTop: '1px solid var(--outline-variant)' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--on-surface-muted)' }}>
                      📦 Envío a: {order.shipping_name}, {order.shipping_address}, {order.shipping_city} {order.shipping_zip}
                    </p>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
