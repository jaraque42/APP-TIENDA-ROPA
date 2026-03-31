"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function FutbolLayout({ children }) {
  const pathname = usePathname();

  const links = [
    { name: 'Todo fútbol', href: '/futbol' },
    { name: 'Zapatillas', href: '/futbol/calzado' },
    { name: 'Ropa', href: '/futbol/textil' },
    { name: 'Accesorios', href: '/futbol/accesorios' },
  ];

  return (
    <div className="running-store-page">
      <aside className="running-sidebar">
        <h1 className="sidebar-title">FÚTBOL <br/><span className="highlight">AERDNA</span></h1>
        <ul className="sidebar-list">
          {links.map((link) => (
            <li key={link.href}>
              <Link 
                href={link.href} 
                className={pathname === link.href ? 'active' : ''}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      
      <section className="running-grid-area">
        {children}
      </section>
    </div>
  );
}
