'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Calendar, Send, ArrowRight, Check } from 'lucide-react';

// ===== Types =====
interface FormData {
  details: string;
  deadlineDate: string; // ISO 'YYYY-MM-DD'
  isDeadlineFlexible: boolean;
}

// Tipe ikon untuk Lucide (React SVG component)
type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

// ===== Helpers =====
const WA_NUMBER = '6282275373233'; // 082275373233 -> +62 tanpa 0 depan

const toIndoDate = (iso: string) => {
  if (!iso) return '';
  try {
    const d = new Date(iso + 'T00:00:00');
    const fmt = new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    return fmt.format(d);
  } catch {
    return iso;
  }
};

const buildWaMessage = (data: FormData) => {
  const lines = [
    'Halo, saya ingin mengajukan *permintaan pengerjaan proyek*.',
    '',
    '📝 *Detail Proyek*:',
    data.details || '- (belum diisi)',
    '',
    '📅 *Deadline*:',
    `${toIndoDate(data.deadlineDate) || data.deadlineDate}`,
    '',
    `Fleksibel Deadline: ${data.isDeadlineFlexible ? 'Ya' : 'Tidak'}`,
    '',
    'Mohon info *estimasi biaya* & *waktu pengerjaan*. Terima kasih! 🙏',
  ];
  return lines.join('\n');
};

const JokiForm = () => {
  // Default: 23 September 2025 -> 2025-09-23
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    details: '',
    deadlineDate: '2025-09-23',
    isDeadlineFlexible: true,
  });

  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    setCanSubmit((formData.details.trim().length >= 10) && !!formData.deadlineDate);
  }, [formData.details, formData.deadlineDate]);

  // tanpa any/never
  const handleInputChange = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep((prev) => (prev < 3 ? prev + 1 : prev));
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  const submitToWhatsApp = () => {
    if (!canSubmit) return;
    const msg = buildWaMessage(formData);
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Enter-to-continue UX
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Enter') return;
      if (step < 3) {
        e.preventDefault();
        nextStep();
      } else {
        e.preventDefault();
        submitToWhatsApp();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [step, canSubmit, formData]); // deps aman

  // Animations
  const slideVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
  } as const;

  const StepperIcon = ({ stepNumber, Icon }: { stepNumber: number; Icon: IconType }) => (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={() => setStep(stepNumber)}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2 shadow-sm ${
          step === stepNumber
            ? 'bg-blue-600 border-blue-600 text-white'
            : step > stepNumber
            ? 'bg-white border-blue-200 text-blue-600'
            : 'bg-white border-slate-200 text-slate-400'
        }`}
      >
        {step > stepNumber ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
      </button>
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl p-8 border bg-white/80 backdrop-blur">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl md:text-3xl font-extrabold text-blue-900">Form Permintaan Proyek</h1>
        <p className="text-slate-600">Isikan detail singkat, pilih deadline, lalu kirim via WhatsApp</p>
      </div>

      {/* Progress Bar */}
      <div className="flex justify-center items-center mb-8">
        <StepperIcon stepNumber={1} Icon={Edit3} />
        <div className={`w-24 h-1 mx-2 transition-colors duration-500 ${step > 1 ? 'bg-blue-500' : 'bg-slate-200'}`}></div>
        <StepperIcon stepNumber={2} Icon={Calendar} />
        <div className={`w-24 h-1 mx-2 transition-colors duration-500 ${step > 2 ? 'bg-blue-500' : 'bg-slate-200'}`}></div>
        <StepperIcon stepNumber={3} Icon={Send} />
      </div>

      {/* Card body with blue gradient frame */}
      <div className="relative rounded-xl p-[1px] bg-gradient-to-br from-blue-200 via-blue-400 to-blue-700">
        <div className="rounded-xl p-6 md:p-8 bg-white">
          <div className="relative h-72 overflow-hidden">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: 'tween', ease: 'easeInOut', duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <h2 className="text-xl md:text-2xl font-bold text-blue-900">Detail Proyek</h2>
                  <p className="text-slate-600 mb-3">Ceritakan fitur/fungsionalitas utama yang kamu butuhkan.</p>
                  <textarea
                    value={formData.details}
                    onChange={(e) => handleInputChange('details', e.target.value)}
                    placeholder="Contoh: Landing page React + integrasi API pembayaran, login, dashboard, dsb."
                    className="w-full h-36 p-4 rounded-lg border border-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-200"
                  />
                  <div className="text-xs text-slate-500 flex justify-between mt-2">
                    <span>Minimal 10 karakter</span>
                    <span className="flex items-center gap-1">Tekan <kbd className="text-[10px] border rounded px-1">Enter</kbd> untuk lanjut</span>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Lanjut <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: 'tween', ease: 'easeInOut', duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <h2 className="text-xl md:text-2xl font-bold text-blue-900">Deadline Proyek</h2>
                  <p className="text-slate-600 mb-4">Kapan proyek ini harus selesai?</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-sm text-slate-600 mb-1">Tanggal Deadline</label>
                      <input
                        type="date"
                        value={formData.deadlineDate}
                        onChange={(e) => handleInputChange('deadlineDate', e.target.value)}
                        className="w-full p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-200"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm text-slate-600 mb-1 invisible md:visible">&nbsp;</label>
                      <button
                        type="button"
                        onClick={() => handleInputChange('isDeadlineFlexible', !formData.isDeadlineFlexible)}
                        className={`w-full p-3 rounded-lg border-2 transition-all ${
                          formData.isDeadlineFlexible
                            ? 'bg-white border-blue-500 text-blue-700'
                            : 'bg-slate-100 border-slate-200 text-slate-600'
                        }`}
                      >
                        Deadline saya fleksibel
                      </button>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 flex justify-between mt-3">
                    <span className="flex items-center gap-1">Tekan <kbd className="text-[10px] border rounded px-1">Enter</kbd> untuk lanjut</span>
                    <div className="flex gap-2">
                      <button onClick={prevStep} className="px-3 py-2 rounded-lg border border-slate-300">Kembali</button>
                      <button onClick={nextStep} className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Lanjut</button>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: 'tween', ease: 'easeInOut', duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <h2 className="text-xl md:text-2xl font-bold text-blue-900 text-center">Review & Kirim</h2>
                  <p className="text-slate-600 text-center mb-4">Cek kembali ringkasan berikut. Jika sudah pas, kirim via WhatsApp.</p>

                  <div className="rounded-lg border border-slate-200 p-4 bg-slate-50">
                    <div className="text-sm text-slate-700 space-y-2">
                      <div>
                        <span className="font-semibold text-slate-900">Detail:</span>
                        <p className="whitespace-pre-wrap">{formData.details || '(belum diisi)'}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-900">Deadline:</span> {toIndoDate(formData.deadlineDate) || formData.deadlineDate}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-900">Fleksibel:</span> {formData.isDeadlineFlexible ? 'Ya' : 'Tidak'}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <button onClick={prevStep} className="px-4 py-2 rounded-lg border border-slate-300">Kembali</button>

                    <button
                      disabled={!canSubmit}
                      onClick={submitToWhatsApp}
                      className={`px-6 py-3 rounded-lg inline-flex items-center gap-2 font-semibold shadow ${
                        canSubmit
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      Kirim via WhatsApp <Send className="w-4 h-4" />
                    </button>
                  </div>

                  {!canSubmit && (
                    <p className="text-[13px] text-rose-600 mt-2 text-right">Lengkapi detail (min. 10 karakter) & pilih tanggal.</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Subtle footer */}
      <div className="mt-6 text-center text-xs text-slate-500">
        Tekan <kbd className="text-[10px] border rounded px-1">Enter</kbd> untuk navigasi cepat • Tema biru & putih
      </div>
    </div>
  );
};

export default JokiForm;
