'use client';

import { useState } from "react";
import { ChevronDown } from "lucide-react";

/** ganti ke 'light' kalau mau background putih + card kaca terang */
type Theme = "dark" | "light";

type QA = { q: string; a: string };

const QA_ITEMS: QA[] = [
  {
    q: "Berapa lama pengerjaan proyek?",
    a: "Tergantung kompleksitas. Untuk landing page sederhana biasanya 1–3 hari. Proyek kustom (dashboard/API) 1–3 minggu."
  },
  {
    q: "Apakah ada garansi revisi?",
    a: "Ada. Kami sediakan 2x revisi minor gratis dalam 7 hari setelah handover. Revisi besar/fitur baru dihitung sebagai tambahan scope."
  },
  {
    q: "Apakah source code diberikan?",
    a: "Ya, untuk paket Pro & Scale. Paket Starter menyediakan file build; upgrade ke Pro untuk akses penuh repository."
  },
  {
    q: "Teknologi apa yang digunakan?",
    a: "Frontend: Next.js + Tailwind. Backend: Laravel/Node sesuai kebutuhan. Auth: NextAuth/Sanctum. Deployment: Vercel/Ubuntu VPS."
  },
  {
    q: "Bagaimana skema pembayaran?",
    a: "Tanpa payment gateway. Pencatatan nominal saja: DP 30–50% saat kick-off, pelunasan setelah UAT/approve."
  }
];

export default function FAQSection({ theme = "dark" as Theme }: { theme?: Theme }) {
  const [open, setOpen] = useState<number | null>(0);

  const isDark = theme === "dark";

  return (
    <section
      className={[
        "relative overflow-hidden py-16 md:py-24",
        isDark ? "bg-slate-950 text-white" : "bg-white text-slate-900",
      ].join(" ")}
    >
      {/* dekor biru lembut */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-blue-700/20 blur-[120px]" />

      <div className="container mx-auto grid items-start gap-10 px-6 md:grid-cols-2">
        {/* kiri: heading & subcopy */}
        <div>
          <h2 className="text-3xl font-extrabold leading-tight md:text-5xl">
            Masih bingung? <span className={isDark ? "text-sky-400" : "text-blue-700"}>Tenang, kami siap</span> membantumu
          </h2>
          <p className={["mt-4 max-w-xl",
            isDark ? "text-slate-300" : "text-slate-600"
          ].join(" ")}>
            Kalau pertanyaanmu belum ada di sini, tinggal chat admin atau isi form konsultasi.
          </p>
        </div>

        {/* kanan: accordion */}
        <div className="space-y-4">
          {QA_ITEMS.map((item, i) => {
            const expanded = open === i;
            return (
              <div
                key={i}
                className={[
                  "rounded-2xl transition-all",
                  isDark
                    ? "glass-dark border border-white/10"
                    : "glass border border-sky-200/50"
                ].join(" ")}
              >
                <button
                  onClick={() => setOpen(expanded ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-5 py-4 text-left"
                >
                  <div className="text-base font-semibold md:text-lg">
                    {item.q}
                  </div>
                  <ChevronDown
                    className={[
                      "h-5 w-5 flex-none transition-transform",
                      expanded ? "rotate-180" : "rotate-0",
                      isDark ? "text-slate-300" : "text-slate-500"
                    ].join(" ")}
                  />
                </button>

                <div
                  className={[
                    "grid overflow-hidden transition-all duration-300 ease-in-out",
                    expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  ].join(" ")}
                >
                  <div className="min-h-0">
                    <div className={["px-5 pb-5 pt-0 text-sm md:text-base",
                      isDark ? "text-slate-300" : "text-slate-600"
                    ].join(" ")}>
                      {item.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
