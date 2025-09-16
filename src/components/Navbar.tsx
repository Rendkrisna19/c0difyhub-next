'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shapes, Menu, X } from 'lucide-react'; // Impor ikon

interface NavbarProps {
  isScrolled: boolean;
}

// Data link navigasi, membuatnya lebih mudah dikelola
const navLinks = [
  { href: '#', label: 'Beranda' },
  { href: '#projects', label: 'Project saya' },
  { href: '#faq', label: 'FAQ' },
  { href: '#marketplace', label: 'Marketplace' },
];

const Navbar = ({ isScrolled }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'bg-[var(--background)]/80 backdrop-blur-lg shadow-md border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-6 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
            <Shapes className="text-[var(--primary)]" size={28} />
            <span className="text-xl font-bold text-[var(--foreground)]">
              CodifyHub
            </span>
          </Link>

          {/* Navigasi Desktop (di tengah) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`transition-colors duration-200 pb-1 ${
                  link.label === 'Project saya'
                    ? 'font-semibold text-[var(--foreground)] border-b-2 border-[var(--primary)]'
                    : 'text-[var(--muted)] hover:text-[var(--primary)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Tombol Aksi (Desktop) */}
          <button className="hidden md:block px-5 py-2 bg-[var(--primary-accent)] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg">
            Pesan sekarang
          </button>

          {/* Tombol Hamburger (Mobile) */}
          <button
            className="md:hidden z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X size={28} className="text-[var(--foreground)]" />
            ) : (
              <Menu size={28} className="text-[var(--foreground)]" />
            )}
          </button>
        </div>
      </nav>

      {/* Menu Overlay Mobile */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-screen bg-[var(--background)] z-40 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 text-xl">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
              onClick={() => setIsMenuOpen(false)} // Tutup menu saat link diklik
            >
              {link.label}
            </Link>
          ))}
          <button className="mt-8 px-8 py-3 bg-[var(--primary-accent)] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg">
            Pesan sekarang
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;