export type ReadyProject = {
  id: string;
  title: string;
  price: string;
  crossed?: string;
  category: "website" | "mobile";
  tags: string[];
};

export const READY_PROJECTS: ReadyProject[] = [
  { id: "p1", title: "Landing Page UMKM SEO-ready", price: "Rp 99.000", crossed: "Rp 180.000", category: "website", tags: ["Next.js", "Tailwind"] },
  { id: "p2", title: "CRUD Admin untuk Inventory", price: "Rp 150.000", crossed: "Rp 475.000", category: "website", tags: ["Laravel", "MySQL"] },
  { id: "p3", title: "Aplikasi Kas Sederhana", price: "Rp 99.000", crossed: "Rp 205.000", category: "mobile",  tags: ["Flutter", "Provider"] },
  { id: "p4", title: "Hitung Luas Bangun Datar", price: "Rp 99.000", crossed: "Rp 205.000", category: "mobile",  tags: ["Android", "Java"] },
  { id: "p5", title: "Filter & Export Tabel", price: "Rp 200.000", crossed: "Rp 475.000", category: "website", tags: ["React", "CSV/PDF"] },
  { id: "p6", title: "Absensi QR Sederhana", price: "Rp 150.000", crossed: "Rp 300.000", category: "mobile",  tags: ["Flutter", "QR"] },
];
