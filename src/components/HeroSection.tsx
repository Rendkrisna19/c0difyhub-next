'use client';

import Image, { StaticImageData } from "next/image";
import { ArrowRight, MessageCircleMore } from "lucide-react";

type Img = string | StaticImageData;

interface HeroImages {
  topLeft?: Img;     // ex: "/images/shape-left.png" ATAU import topLeft from "@/public/images/shape-left.png"
  topRight?: Img;    // ex: "/images/shape-right.png" ATAU import topRight from "@/public/images/shape-right.png"
  bottom?: Img;      // ex: "/images/shape-bottom.png" ATAU import bottom from "@/public/images/shape-bottom.png"
}

interface HeroProps {
  isScrolled: boolean;        // tetap dipakai untuk efek blur/scale saat scroll
  images?: HeroImages;        // opsional
}

export default function HeroSection({ isScrolled, images }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-white"
    >
      {/* Grid & glow background (putih, biru muda + tua) */}
      <div className="absolute inset-0 -z-10">
        {/* grid halus */}
        <div className="bg-grid-slate/60 absolute inset-0 [mask-image:linear-gradient(to_bottom,white,rgba(255,255,255,0.6))]" />
        {/* soft glows */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="pointer-events-none absolute top-1/3 -right-20 h-[28rem] w-[28rem] rounded-full bg-blue-600/15 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-80 w-80 rounded-full bg-sky-300/20 blur-3xl" />
      </div>

      {/* Gambar dekoratif (mendukung path string atau import) */}
      {images?.topLeft && (
        <div
          aria-hidden
          className="pointer-events-none absolute left-3 top-16 select-none"
        >
          <Image
            src={images.topLeft}
            alt=""
            width={220}
            height={220}
            className="opacity-80 drop-shadow-2xl motion-safe:animate-float-slow"
            priority
          />
        </div>
      )}

      {images?.topRight && (
        <div
          aria-hidden
          className="pointer-events-none absolute right-4 top-8 select-none"
        >
          <Image
            src={images.topRight}
            alt=""
            width={260}
            height={260}
            className="opacity-85 drop-shadow-2xl motion-safe:animate-float-slower"
            priority
          />
        </div>
      )}

      {images?.bottom && (
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-2 right-1/3 select-none"
        >
          <Image
            src={images.bottom}
            alt=""
            width={280}
            height={280}
            className="opacity-75 drop-shadow-2xl motion-safe:animate-float-slow"
          />
        </div>
      )}

      {/* Konten */}
      <div
        className={[
          "relative z-10 mx-auto max-w-4xl px-6 text-center transition-all duration-500",
          isScrolled
            ? "scale-[.98] opacity-85 blur-[1.5px] md:blur-[2px]"
            : "scale-100 opacity-100 blur-0",
        ].join(" ")}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-sky-200/60 bg-white/70 px-3 py-1 text-xs font-medium text-sky-700 shadow-sm backdrop-blur">
          CodifyHub • Jasa Website
        </span>

        <h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl">
          Kami Jokiin{" "}
          <span className="text-blue-700 drop-shadow-[0_0_10px_rgba(14,165,233,0.35)]">
            Proyek Kodingan
          </span>{" "}
          Kamu,
          <br />
          Mulai dari{" "}
          <span className="text-blue-700 underline decoration-4 underline-offset-4 drop-shadow-[0_0_12px_rgba(29,78,216,0.35)]">
            99K Aja!
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 md:text-xl">
          Layanan implementasi proyek IT yang terjangkau, efisien, dan dapat diandalkan.
          Fokus pada kualitas, kecepatan, dan hasil sesuai kebutuhanmu.
        </p>

        {/* CTA lucide-react */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#order"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 px-6 py-3 font-semibold text-white shadow-xl shadow-blue-500/30 transition hover:scale-105 hover:shadow-blue-500/50"
          >
            Pesan Sekarang
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl border border-sky-300/70 bg-white/60 px-6 py-3 font-semibold text-sky-700 backdrop-blur transition hover:bg-sky-50 hover:text-sky-800"
          >
            Tanya Admin
            <MessageCircleMore className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
