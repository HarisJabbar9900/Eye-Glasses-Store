import React from 'react';
import { BookOpen, FileText } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const PrescriptionGuide = () => {
  const { navigateTo } = useStore();

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="badge-gold text-xs">OPTOMETRY GUIDE &amp; EXPLANATION</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] mt-3 mb-4 font-serif leading-tight">
            How to Read &amp; Understand Your Eye Prescription
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Prescription abbreviations like SPH, CYL, AXIS, and PD decoded step-by-step by certified optometrists.
          </p>
        </div>

        {/* Abbreviation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 sm:mb-16">
          <div className="glass-panel p-8 rounded-3xl border border-[var(--border-color)] shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-9 h-9 rounded-xl bg-[#d4af37]/20 text-[var(--accent-gold)] font-bold flex items-center justify-center text-xs">
                OD
              </span>
              <h4 className="text-lg font-bold text-[var(--text-primary)] font-serif">
                OD vs OS (Right &amp; Left Eye)
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              <strong>OD</strong> stands for <em>Oculus Dexter</em> (Latin for Right Eye), while <strong>OS</strong> stands for <em>Oculus Sinister</em> (Latin for Left Eye). If you see <strong>OU</strong>, it refers to both eyes.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-[var(--border-color)] shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-xs">
                SPH
              </span>
              <h4 className="text-lg font-bold text-[var(--text-primary)] font-serif">
                Sphere (SPH) - Lens Power
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Indicates the lens power measured in diopters (D). A minus sign (<strong>-</strong>) means you are nearsighted (myopic), while a plus sign (<strong>+</strong>) means farsighted (hyperopic).
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-[var(--border-color)] shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-9 h-9 rounded-xl bg-[#d4af37]/20 text-[var(--accent-gold)] font-bold flex items-center justify-center text-xs">
                CYL
              </span>
              <h4 className="text-lg font-bold text-[var(--text-primary)] font-serif">
                Cylinder (CYL) &amp; Axis (AXIS)
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              CYL measures the correction needed for astigmatism. AXIS is the angle (between 1 and 180 degrees) where astigmatism correction is positioned on your cornea.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-[var(--border-color)] shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 font-bold flex items-center justify-center text-xs">
                PD
              </span>
              <h4 className="text-lg font-bold text-[var(--text-primary)] font-serif">
                Pupillary Distance (PD)
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              The exact distance in millimeters between the centers of your pupils. This ensures the optical center of the lens aligns perfectly with your pupils. (Average adult PD is 58-66 mm).
            </p>
          </div>
        </div>

        {/* Sample Prescription Slip Breakdown */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl mb-12 sm:mb-16 border border-[var(--border-color)] shadow-lg">
          <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-6 font-serif flex items-center gap-3">
            <FileText className="w-7 h-7 text-[var(--accent-gold)]" /> Sample Prescription Breakdown
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-[var(--bg-input)] text-[var(--text-muted)] font-bold uppercase tracking-wider">
                  <th className="p-3.5 rounded-l-2xl">Eye</th>
                  <th className="p-3.5">SPH (Sphere)</th>
                  <th className="p-3.5">CYL (Cylinder)</th>
                  <th className="p-3.5">AXIS (Angle)</th>
                  <th className="p-3.5 rounded-r-2xl">ADD (Reading)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)]">
                <tr>
                  <td className="p-3.5 font-bold text-[var(--text-primary)]">OD (Right Eye)</td>
                  <td className="p-3.5 text-[var(--accent-gold)] font-bold font-serif">-2.00</td>
                  <td className="p-3.5 text-[var(--text-secondary)]">-0.75</td>
                  <td className="p-3.5 text-[var(--text-secondary)]">090</td>
                  <td className="p-3.5 text-[var(--text-secondary)]">+1.50</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-[var(--text-primary)]">OS (Left Eye)</td>
                  <td className="p-3.5 text-[var(--accent-gold)] font-bold font-serif">-1.75</td>
                  <td className="p-3.5 text-[var(--text-secondary)]">-0.50</td>
                  <td className="p-3.5 text-[var(--text-secondary)]">085</td>
                  <td className="p-3.5 text-[var(--text-secondary)]">+1.50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-[var(--border-color)] text-center shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3 font-serif">
            Ready to Configure Your Lenses?
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-md mx-auto mb-6 leading-relaxed">
            Pick any titanium or acetate frame and add custom blue-block, progressive or prescription lenses in our 3D mirror studio.
          </p>
          <button onClick={() => navigateTo('shop')} className="btn-gold py-4 px-10 text-sm sm:text-base font-bold rounded-2xl shadow-lg shadow-[#d4af37]/25">
            Select Your Eyewear Frame &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
