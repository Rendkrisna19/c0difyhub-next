'use client';

import { Award, Quote, Star } from "lucide-react";
import { TESTIMONIALS, Testimonial } from "@/data/testimonials";

function TCard({ item }: { item: Testimonial }) {
  return (
    <article className="glass snap-center flex w-[320px] flex-none flex-col rounded-2xl p-5 text-slate-900 shadow-lg shadow-blue-500/20 md:w-full">
      <div className="flex items-start justify-between">
        <div className="text-xs uppercase tracking-wide text-slate-600">
          <div>Jenis Proyek</div>
          <div className="text-lg font-extrabold text-slate-900">{item.kind}</div>
        </div>
        <div className="text-xs uppercase tracking-wide text-slate-600 text-right">
          <div>Waktu Pengerjaan</div>
          <div className="text-lg font-extrabold text-slate-900">{item.when}</div>
        </div>
      </div>

      <p className="mt-4 line-clamp-[8] text-slate-700">
        <Quote className="mr-2 inline h-4 w-4 text-sky-600" />
        {item.quote}
      </p>

      <div className="mt-auto flex items-center justify-between pt-6">
        <div className="inline-flex items-center gap-2 text-sm text-slate-600">
          <Award className="h-4 w-4 text-sky-600" />
          <span>Tingkat rekomendasi</span>
        </div>
        <div className="flex items-center gap-1 text-slate-900">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-xl font-bold">{item.score}</span>
          <span className="text-slate-500">/10</span>
        </div>
      </div>
    </article>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 text-slate-900 md:py-24">
      {/* dekor lembut biru */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-sky-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-blue-600/20 blur-[120px]" />

      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
          Testimoni <span className="text-blue-700">klien kami</span>
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-slate-600">
          Dipercaya oleh banyak klien untuk menyelesaikan proyek mereka.
        </p>
      </div>

      {/* Mobile: horizontal snap; Desktop: grid */}
      <div className="mt-10 md:mt-14 relative z-10">
        {/* mobile/tablet */}
        <div className="container mx-auto px-6 md:hidden">
          <div className="flex snap-x-mandatory gap-4 overflow-x-auto pb-2">
            {TESTIMONIALS.map((t) => (
              <TCard key={t.id} item={t} />
            ))}
          </div>
        </div>

        {/* desktop grid */}
        <div className="container mx-auto hidden grid-cols-3 gap-5 px-6 md:grid lg:grid-cols-4">
          {TESTIMONIALS.map((t) => (
            <TCard key={t.id} item={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
