'use client';

import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Box, Smartphone, ArrowRight } from "lucide-react";
import { READY_PROJECTS, ReadyProject } from "@/data/readyProjects";

const CATS = [
  { key: "website", label: "Website", icon: Box },
  { key: "mobile",  label: "Mobile",  icon: Smartphone },
] as const;

function Chip(props: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  Icon: LucideIcon;
}) {
  const { active, onClick, children, Icon } = props;
  return (
    <button
      onClick={onClick}
      className={[
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition",
        active
          ? "bg-gradient-to-r from-sky-400 to-blue-600 text-white shadow"
          : "border border-sky-200 text-sky-700 hover:bg-sky-50",
      ].join(" ")}
    >
      <Icon className="h-4 w-4" />
      {children}
    </button>
  );
}

/** Kartu ukuran seragam + kaca transparan */
function Card({ item }: { item: ReadyProject }) {
  return (
    <div className="glass flex h-[250px] w-[340px] flex-none flex-col rounded-2xl p-5">
      <p className="text-xs text-slate-600/90">Deskripsi Proyek</p>
      <h4 className="mt-1 line-clamp-2 text-lg font-semibold text-slate-900">
        {item.title}
      </h4>

      <div className="mt-3 flex min-h-[22px] flex-wrap gap-2">
        {item.tags.map((t) => (
          <span
            key={t}
            className="rounded-lg border border-sky-300/60 bg-white/70 px-3 py-1 text-xs font-medium text-sky-700"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-end justify-between">
        <div className="text-xs text-slate-600/90">Proyek siap kirim</div>
        <div className="text-right">
          {item.crossed && (
            <div className="text-xs text-slate-400 line-through">{item.crossed}</div>
          )}
          <div className="text-xl font-bold text-blue-700">{item.price}</div>
        </div>
      </div>

      <a
        href="#order"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 px-4 py-2 font-semibold text-white shadow hover:brightness-110"
      >
        Lihat Detail <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

export default function ReadyProjectsSection() {
  const [cat, setCat] = useState<(typeof CATS)[number]["key"]>("website");
  const list = useMemo(
    () => READY_PROJECTS.filter((p) => p.category === cat),
    [cat]
  );

  return (
    <section className="relative overflow-hidden bg-white py-16">
      {/* dekor biru & grid halus */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-sky-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-blue-600/15 blur-[120px]" />
      <div className="bg-grid-slate/60 absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,white,rgba(255,255,255,.55))]" />

      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          Kami Punya <span className="text-blue-700">Proyek Siap Pakai</span>
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-slate-600">
          Telusuri proyek sesuai kebutuhanmu. Harga hemat, pengerjaan cepat.
        </p>

        {/* kategori */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {CATS.map(({ key, label, icon: Icon }) => (
            <Chip
              key={key}
              active={cat === key}
              onClick={() => setCat(key)}
              Icon={Icon}
            >
              {label}
            </Chip>
          ))}
        </div>
      </div>

      {/* marquee infinite tanpa celah */}
      <div className="relative mt-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />

        <div className="marquee px-5">
          <div className="marquee__track">
            {/* LIST A */}
            {list.map((item) => <Card key={`A-${item.id}`} item={item} />)}
            {/* LIST A (duplikat) */}
            {list.map((item) => <Card key={`B-${item.id}`} item={item} />)}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="mt-6 text-right">
          {/* <a
            href="#market"
            className="text-blue-700 underline underline-offset-4 hover:text-blue-800"
          >
            Lihat Lebih Banyak &rsaquo;
          </a> */}
        </div>
      </div>
    </section>
  );
}
