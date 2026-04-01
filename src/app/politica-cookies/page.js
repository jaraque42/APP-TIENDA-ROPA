export const metadata = {
  title: "Política de Cookies - AERDNA",
  description: "Información sobre el uso de cookies en la plataforma AERDNA.",
};

export default function PoliticaCookies() {
  return (
    <main style={{ paddingTop: '6rem', maxWidth: '800px', margin: '0 auto', padding: '6rem 2rem 4rem' }}>

      <header style={{ marginBottom: '3rem' }}>
        <h1 className="display-text" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
          POLÍTICA DE <span className="highlight">COOKIES</span>
        </h1>
        <p style={{ color: 'var(--on-surface-muted)', marginTop: '1rem', fontSize: '0.9rem' }}>
          Última actualización: Abril 2026
        </p>
      </header>

      <article className="legal-content">

        <section className="legal-section">
          <h2>1. ¿Qué son las cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, teléfono móvil o tablet)
            cuando visitas un sitio web. Se utilizan ampliamente para hacer que los sitios web funcionen de manera más
            eficiente, así como para proporcionar información a los propietarios del sitio.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. ¿Qué cookies utilizamos?</h2>
          <p>En AERDNA utilizamos las siguientes categorías de cookies:</p>

          <div className="cookie-table">
            <div className="cookie-row cookie-row-header">
              <span>Cookie</span>
              <span>Tipo</span>
              <span>Duración</span>
              <span>Finalidad</span>
            </div>
            <div className="cookie-row">
              <span><code>aerdna_token</code></span>
              <span>Sesión</span>
              <span>7 días</span>
              <span>Mantener la sesión iniciada del usuario</span>
            </div>
            <div className="cookie-row">
              <span><code>aerdna_cookie_consent</code></span>
              <span>Preferencia</span>
              <span>Permanente</span>
              <span>Recordar tu elección sobre las cookies</span>
            </div>
            <div className="cookie-row">
              <span><code>aerdna_cart</code></span>
              <span>Funcional</span>
              <span>Permanente</span>
              <span>Guardar el carrito de compras (visitantes sin cuenta)</span>
            </div>
          </div>
        </section>

        <section className="legal-section">
          <h2>3. Cookies esenciales</h2>
          <p>
            Estas cookies son necesarias para que el sitio web funcione correctamente. Sin ellas, no podrías 
            iniciar sesión, gestionar tu carrito de compras ni completar un pedido. Estas cookies no recopilan 
            información personal con fines de marketing.
          </p>
        </section>

        <section className="legal-section">
          <h2>4. Cookies de terceros</h2>
          <p>
            Actualmente, AERDNA <strong style={{ color: '#fff' }}>no utiliza cookies de terceros</strong> con fines publicitarios 
            ni de seguimiento. No compartimos tu información de navegación con redes publicitarias ni plataformas de análisis externas.
          </p>
        </section>

        <section className="legal-section">
          <h2>5. ¿Cómo gestionar las cookies?</h2>
          <p>
            Puedes controlar y/o eliminar las cookies según desees. Puedes eliminar todas las cookies que ya 
            están en tu dispositivo y configurar la mayoría de los navegadores para que no las acepten. Sin 
            embargo, si lo haces, es posible que tengas que ajustar manualmente algunas preferencias cada vez que 
            visites nuestro sitio, y que algunos servicios y funcionalidades no estén disponibles.
          </p>
          <p>
            Para gestionar las cookies en tu navegador, consulta la documentación oficial:
          </p>
          <ul>
            <li><strong style={{ color: '#fff' }}>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
            <li><strong style={{ color: '#fff' }}>Firefox:</strong> Preferencias → Privacidad y seguridad</li>
            <li><strong style={{ color: '#fff' }}>Safari:</strong> Preferencias → Privacidad</li>
            <li><strong style={{ color: '#fff' }}>Edge:</strong> Configuración → Cookies y permisos del sitio</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>6. Base legal</h2>
          <p>
            El uso de cookies esenciales se fundamenta en nuestro interés legítimo para el correcto funcionamiento 
            del sitio web (Art. 6.1.f del RGPD). Para las cookies no esenciales, solicitamos tu consentimiento 
            explícito conforme al Art. 6.1.a del RGPD y la Ley 34/2002 (LSSI-CE).
          </p>
        </section>

        <section className="legal-section">
          <h2>7. Contacto</h2>
          <p>
            Si tienes alguna pregunta sobre nuestra política de cookies, puedes contactarnos en:{" "}
            <strong style={{ color: 'var(--primary-container)' }}>privacidad@aerdna.com</strong>
          </p>
        </section>

      </article>
    </main>
  );
}
