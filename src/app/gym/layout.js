"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function GymLayout({ children }) {
  const pathname = usePathname();

  const links = [
    { name: 'Todo gym y training', href: '/gym' },
    { name: 'Zapatillas', href: '/gym/calzado' },
    { name: 'Ropa', href: '/gym/textil' },
    { name: 'Accesorios', href: '/gym/accesorios' },
  ];

  return (
    <div className="running-store-page">
      <aside className="running-sidebar">
        <h1 className="sidebar-title">GYM <br/><span className="highlight">AERDNA</span></h1>
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
