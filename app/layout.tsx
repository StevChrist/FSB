'use client'

import { useState } from 'react';
import "./globals.css";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// Navbar Component
const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/chat', label: 'Try FSB.' },
    // { href: '/how-to-use', label: 'How To Use' }
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: '#014F39',
      borderBottom: '1px solid rgba(251, 247, 199, 0.2)',
      width: '100%'
    }}>
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 32px',
        maxWidth: '100%',
        margin: '0 auto',
        height: '60px',
        boxSizing: 'border-box'
      }}>
        {/* Logo - Left Side */}
        <Link href="/" style={{
          fontSize: '28px',
          fontWeight: '700',
          fontFamily: 'Montserrat, sans-serif',
          color: '#FBF7C7',
          textDecoration: 'none',
          flexShrink: 0
        }}>
          FSB.
        </Link>

        {/* Desktop Navigation - Right Side */}
        <div style={{
          display: 'flex',
          gap: '32px',
          alignItems: 'center',
          height: '100%'
        }} className="desktop-nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                fontFamily: 'Lora, serif',
                fontSize: '16px',
                color: isActive(item.href) ? '#FBF7C7' : 'rgba(251, 247, 199, 0.8)',
                textDecoration: 'none',
                fontWeight: isActive(item.href) ? '600' : '400',
                padding: '8px 16px',
                borderRadius: '6px',
                backgroundColor: isActive(item.href) ? 'rgba(251, 247, 199, 0.1)' : 'transparent',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                height: '40px'
              }}
              onMouseEnter={(e) => {
                if (!isActive(item.href)) {
                  e.currentTarget.style.backgroundColor = 'rgba(251, 247, 199, 0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(item.href)) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '4px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            justifyContent: 'center',
            alignItems: 'center',
            width: '40px',
            height: '40px'
          }}
          className="mobile-menu-btn"
        >
          <span style={{
            width: '24px',
            height: '2px',
            backgroundColor: '#FBF7C7',
            transition: 'all 0.3s ease',
            transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
          }}></span>
          <span style={{
            width: '24px',
            height: '2px',
            backgroundColor: '#FBF7C7',
            transition: 'all 0.3s ease',
            opacity: isMobileMenuOpen ? 0 : 1
          }}></span>
          <span style={{
            width: '24px',
            height: '2px',
            backgroundColor: '#FBF7C7',
            transition: 'all 0.3s ease',
            transform: isMobileMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none'
          }}></span>
        </button>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#014F39',
            border: '1px solid rgba(251, 247, 199, 0.2)',
            borderTop: 'none',
            padding: '16px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            zIndex: 999
          }} className="mobile-nav">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  fontFamily: 'Lora, serif',
                  fontSize: '16px',
                  color: isActive(item.href) ? '#FBF7C7' : 'rgba(251, 247, 199, 0.8)',
                  textDecoration: 'none',
                  fontWeight: isActive(item.href) ? '600' : '400',
                  padding: '12px 16px',
                  borderRadius: '6px',
                  backgroundColor: isActive(item.href) ? 'rgba(251, 247, 199, 0.1)' : 'transparent',
                  transition: 'all 0.3s ease'
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-nav {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};

// Footer Component
const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: '#014F39',
      color: '#FBF7C7',
      padding: '24px 32px',
      textAlign: 'center',
      borderTop: '1px solid rgba(251, 247, 199, 0.2)',
      marginTop: 'auto',
      width: '100%'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        flexWrap: 'wrap',
        fontFamily: 'Lora, serif',
        fontSize: '14px'
      }}>
        <span style={{
          color: '#FBF7C7',
          opacity: 0.9
        }}>
          Copyright © 2025 by FSB | All Rights Reserved
        </span>
        
        <div style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center'
        }}>
        </div>
      </div>

      {/* Mobile responsive copyright */}
      <style jsx>{`
        @media (max-width: 768px) {
          footer > div {
            flex-direction: column !important;
            gap: 12px !important;
          }
          footer span {
            font-size: 12px !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        padding: 0,
        fontFamily: 'Lora, serif',
        backgroundColor: '#014F39',
        color: '#FBF7C7',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
