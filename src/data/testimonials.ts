export type Testimonial = {
  id: string;
  kind: "Website" | "Mobile" | "Aplikasi Sederhana" | "Data Science";
  when: string;            // e.g. "May 2025"
  quote: string;
  score: number;           // 1..10
};

export const TESTIMONIALS: Testimonial[] = [
  { id:"t1", kind:"Website", when:"May 2025", quote:"Gacor bet amanah, hasilnya memuaskan", score:10 },
  { id:"t2", kind:"Website", when:"August 2025", quote:"Cepat, biaya terjangkau, fast respon", score:9 },
  { id:"t3", kind:"Aplikasi Sederhana", when:"October 2024", quote:"Deadline sehari, 2 jam selesai. Hasil bagus, sangat recommend!", score:10 },
  { id:"t4", kind:"Website", when:"July 2024", quote:"Harga sesuai kualitas, tepat waktu. Overall suka!", score:9 },
  { id:"t5", kind:"Website", when:"October 2024", quote:"Pelayanan ramah, sabar. Mantap!", score:10 },
  { id:"t6", kind:"Data Science", when:"January 2025", quote:"Rinci, cepat, jelas. Harga masuk akal, hasil memuaskan.", score:10 },
];
