import React from 'react';
import { Lock, FileText } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const LegalPage = () => {
  const { navigateTo } = useStore();

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="badge-gold text-xs">LEGAL &amp; PRIVACY</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] mt-3 mb-4 font-serif leading-tight">
            Privacy Policy &amp; Terms of Service
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Last updated: Spring 2026. How LUMEN &amp; OPTIC protects client health &amp; optical data.
          </p>
        </div>

        <div className="glass-panel p-8 sm:p-10 rounded-3xl mb-8 border border-[var(--border-color)] shadow-xl">
          <h3 className="text-xl sm:text-2xl font-bold text-[var(--accent-gold)] mb-4 flex items-center gap-3 font-serif">
            <Lock className="w-6 h-6 shrink-0" /> 1. Confidentiality of Health &amp; Prescription Records
          </h3>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            All prescription details, optometrist slips, and PD camera measurements uploaded to LUMEN &amp; OPTIC are encrypted using 256-bit AES encryption. We never share, sell, or disclose medical eye care data to third-party advertisers.
          </p>
        </div>

        <div className="glass-panel p-8 sm:p-10 rounded-3xl mb-12 border border-[var(--border-color)] shadow-xl">
          <h3 className="text-xl sm:text-2xl font-bold text-[var(--accent-gold)] mb-4 flex items-center gap-3 font-serif">
            <FileText className="w-6 h-6 shrink-0" /> 2. Lifetime Optical Frame Warranty
          </h3>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            All titanium and acetate frames sold by LUMEN &amp; OPTIC carry a lifetime manufacturing defect warranty against hinge failure, solder joint breakage, or plating peeling.
          </p>
        </div>

        <div className="text-center">
          <button onClick={() => navigateTo('home')} className="btn-gold py-4 px-10 text-sm sm:text-base font-bold rounded-2xl shadow-lg shadow-[#d4af37]/25">
            Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};
