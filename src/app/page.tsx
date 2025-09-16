'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import JokiForm from '@/components/JokiForm';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="min-h-[200vh] bg-[var(--background)]">
      <Navbar isScrolled={isScrolled} />
      <HeroSection
        isScrolled={isScrolled}
        images={{
          topLeft:  "/images/shape-left.png",
          topRight: "/images/shape-right.png",
          bottom:   "/images/shape-bottom.png",
        }}
      />
      <section id="joki-form" className="py-20 flex justify-center">
        <JokiForm />
      </section>
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-4xl font-bold">Bagian Selanjutnya</h2>
        <p className="text-[var(--muted-foreground)] mt-4">Konten website Anda akan muncul di sini.</p>
      </div>
    </main>
  );
}
