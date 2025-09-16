'use client';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import JokiForm from '@/components/JokiForm';
import ReadyProjectsSection from '@/components/ReadyProjectsSection';
import { ScrollProvider, useScrollInfo } from '@/context/ScrollContext';
import BlurOnScrollSection from '@/components/BlurOnScrollSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer'; 

function PageInner() {
  const { isScrolled } = useScrollInfo(); // pakai di Navbar & Hero

  return (
    <main className="min-h-[200vh] bg-[var(--background)]">
      <Navbar isScrolled={isScrolled} />

      {/* HERO (kontennya masih pakai prop isScrolled yang sudah ada) */}
      <BlurOnScrollSection as="section">
        <HeroSection
          isScrolled={isScrolled}
          images={{
            topLeft:  "/images/shape-left.png",
            topRight: "/images/shape-right.png",
            bottom:   "/images/shape-bottom.png",
          }}
        />
      </BlurOnScrollSection>

      {/* FORM */}
      <BlurOnScrollSection as="section" className="py-20">
        <div className="flex justify-center">
          <JokiForm />
        </div>
      </BlurOnScrollSection>

      {/* READY PROJECTS */}
      <BlurOnScrollSection as="section" className="py-20">
        <ReadyProjectsSection />
      </BlurOnScrollSection>

      {/* Section demo lain */}
      <BlurOnScrollSection as="section" className="">
       <TestimonialsSection />
      </BlurOnScrollSection>
      <BlurOnScrollSection as="section" className="container mx-auto py-20 text-center">
       <FAQSection theme="light" />
      </BlurOnScrollSection>
      <BlurOnScrollSection as="section" className="container mx-auto py-20 text-center">
       <Footer />
      </BlurOnScrollSection>
    </main>
  );
}

export default function Home() {
  // Provider membungkus halaman agar semua child bisa baca isScrolled/isScrolling
  return (
    <ScrollProvider>
      <PageInner />
    </ScrollProvider>
  );
}
