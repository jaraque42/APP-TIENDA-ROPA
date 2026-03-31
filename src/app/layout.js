import { Lexend, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext.js";
import { CartProvider } from "@/context/CartContext.js";
import Navbar from "@/components/Navbar.js";

const lexend = Lexend({ subsets: ["latin"], variable: '--font-label' });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: '--font-body' });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["600", "700"], variable: '--font-display' });

export const metadata = {
  title: "AERDNA - Tienda Oficial",
  description: "AERDNA High-Performance Editorial. Innovación y estilo.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${jakarta.variable} ${lexend.variable} ${spaceGrotesk.variable}`}>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
