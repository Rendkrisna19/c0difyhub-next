'use client';

import { Mail, Phone, MapPin, Facebook, Instagram, Github } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative mt-20 bg-white/80 backdrop-blur border-t border-sky-100 shadow-inner shadow-blue-500/10">
      {/* dekor blur biru */}
      <div className="pointer-events-none absolute -top-24 left-0 h-40 w-40 rounded-full bg-sky-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-40 w-40 rounded-full bg-blue-600/20 blur-3xl" />

      <div className="container mx-auto px-6 py-12 relative z-10 grid gap-10 md:grid-cols-4">
        {/* brand */}
        <div>
          <h3 className="text-2xl font-extrabold text-blue-700">CodifyHub</h3>
          <p className="mt-3 text-sm text-slate-600 max-w-xs">
            Jasa pembuatan website, aplikasi, dan solusi IT sesuai kebutuhan bisnis Anda.
          </p>
        </div>

        {/* navigasi */}
        <div>
          <h4 className="font-semibold text-slate-800 mb-3">Navigasi</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-blue-700">Beranda</Link></li>
            <li><Link href="#projects" className="hover:text-blue-700">Proyek</Link></li>
            <li><Link href="#testimoni" className="hover:text-blue-700">Testimoni</Link></li>
            <li><Link href="#faq" className="hover:text-blue-700">FAQ</Link></li>
          </ul>
        </div>

        {/* kontak */}
        <div>
          <h4 className="font-semibold text-slate-800 mb-3">Kontak</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-blue-600" /> +62 812 3456 7890</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-blue-600" /> admin@codifyhub.com</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-blue-600" /> Jakarta, Indonesia</li>
          </ul>
        </div>

        {/* sosmed */}
        <div>
          <h4 className="font-semibold text-slate-800 mb-3">Ikuti Kami</h4>
          <div className="flex gap-4">
            <Link href="https://facebook.com" target="_blank" className="p-2 rounded-full border border-sky-200 hover:bg-sky-50 transition">
              <Facebook className="h-5 w-5 text-blue-600" />
            </Link>
            <Link href="https://instagram.com" target="_blank" className="p-2 rounded-full border border-sky-200 hover:bg-sky-50 transition">
              <Instagram className="h-5 w-5 text-pink-500" />
            </Link>
            <Link href="https://github.com" target="_blank" className="p-2 rounded-full border border-sky-200 hover:bg-sky-50 transition">
              <Github className="h-5 w-5 text-slate-800" />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-sky-100 text-center py-4 text-sm text-slate-500">
        © {new Date().getFullYear()} CodifyHub. All rights reserved.
      </div>
    </footer>
  );
}
