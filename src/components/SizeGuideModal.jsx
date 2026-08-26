import React, { useState } from 'react';
import { X, CreditCard, Ruler, Info, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SIZE_GUIDE_DATA } from '../data/products';

export const SizeGuideModal = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useStore();
  const [activeTab, setActiveTab] = useState('card');

  if (!isSizeGuideOpen) return null;

  return (
    <div className="fixed inset-0 w-screen h-screen bg-slate-950/85 backdrop-blur-md z-[1000] flex items-center justify-center p-3 sm:p-5 animate-fade-in">
      <div className="glass-panel w-full max-w-3xl max-h-[92vh] rounded-3xl overflow-y-auto flex flex-col shadow-2xl bg-[var(--bg-primary)]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[var(--border-color)] flex items-center justify-between bg-slate-900/80 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#d4af37]/20 text-[var(--accent-gold)] flex items-center justify-center shrink-0">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-[var(--text-primary)] font-serif line-clamp-1">
                Precision Frame Size &amp; Fit Guide
              </h3>
              <span className="text-xs text-[var(--text-muted)] block">
                Find your perfect eyewear width in 30 seconds
              </span>
            </div>
          </div>

          <button onClick={() => setIsSizeGuideOpen(false)} className="btn-icon w-9 h-9 shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 flex flex-col gap-6">
          {/* Method Tabs */}
          <div className="flex gap-2.5">
            <button
              onClick={() => setActiveTab('card')}
              className={`flex-1 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold border cursor-pointer transition-all flex items-center justify-center gap-2 ${
                activeTab === 'card'
                  ? 'border-[#d4af37] bg-[#d4af37]/20 text-[var(--accent-gold)] shadow-md'
                  : 'border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-secondary)] hover:border-[#d4af37]/30'
              }`}
            >
              <CreditCard className="w-4 h-4" /> Credit Card Face Test
            </button>
            <button
              onClick={() => setActiveTab('numbers')}
              className={`flex-1 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold border cursor-pointer transition-all flex items-center justify-center gap-2 ${
                activeTab === 'numbers'
                  ? 'border-[#d4af37] bg-[#d4af37]/20 text-[var(--accent-gold)] shadow-md'
                  : 'border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-secondary)] hover:border-[#d4af37]/30'
              }`}
            >
              <Info className="w-4 h-4" /> Temple Numbers Decoded
            </button>
          </div>

          {activeTab === 'card' ? (
            <div className="flex flex-col gap-6">
              <div className="p-6 bg-[var(--bg-input)] rounded-2xl border border-[var(--border-color)]">
                <h4 className="text-sm font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2 font-serif">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> How to do the 30-second Credit Card Test:
                </h4>
                <ol className="text-xs sm:text-sm text-[var(--text-secondary)] space-y-2.5 list-decimal list-inside leading-relaxed">
                  <li>Stand in front of a mirror or open your smartphone front camera.</li>
                  <li>Take any standard standard card (credit card, ATM card, CNIC).</li>
                  <li>Place the vertical long edge of the card against the center bridge of your nose.</li>
                  <li>Look where the outer edge of the card aligns with the outer corner of your eye:</li>
                </ol>
              </div>

              {/* 3 Size Outcomes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] flex flex-col justify-between shadow-sm">
                  <div>
                    <span className="badge-gold text-xs block w-max mb-2">SIZE S</span>
                    <strong className="text-sm font-bold text-[var(--text-primary)] block mb-1">Small Frame Fit</strong>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      Card extends <strong>beyond</strong> the edge of your eye corner.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[var(--border-color)] text-xs text-[var(--accent-gold)] font-bold">
                    Lens Width: 48mm - 50mm
                  </div>
                </div>

                <div className="p-5 rounded-2xl border-2 border-[#d4af37] bg-[#d4af37]/10 flex flex-col justify-between shadow-md">
                  <div>
                    <span className="badge-gold text-xs block w-max mb-2">MOST POPULAR</span>
                    <strong className="text-sm font-bold text-[var(--text-primary)] block mb-1">Medium Frame Fit</strong>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      Card edge touches <strong>exactly</strong> the outer corner of your eye.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[var(--border-color)] text-xs text-[var(--accent-gold)] font-bold">
                    Lens Width: 51mm - 53mm
                  </div>
                </div>

                <div className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] flex flex-col justify-between shadow-sm">
                  <div>
                    <span className="badge-gold text-xs block w-max mb-2">SIZE L</span>
                    <strong className="text-sm font-bold text-[var(--text-primary)] block mb-1">Large Frame Fit</strong>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      Card does <strong>not reach</strong> the outer corner of your eye.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[var(--border-color)] text-xs text-[var(--accent-gold)] font-bold">
                    Lens Width: 54mm - 58mm
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Temple Numbers Tab */
            <div className="flex flex-col gap-6">
              <div className="p-6 bg-[var(--bg-input)] rounded-2xl border border-[var(--border-color)]">
                <h4 className="text-sm font-bold text-[var(--text-primary)] mb-3 font-serif">
                  Look Inside the Temple Arm of Your Current Glasses:
                </h4>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  You will usually find three numbers printed on the inside arm (e.g. <strong className="text-[var(--accent-gold)]">52 □ 18 - 140</strong>). Here is what each represents:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)]">
                    <strong className="text-base font-bold text-[var(--accent-gold)] block font-serif">52 mm</strong>
                    <span className="font-bold text-[var(--text-primary)] block mt-1">Lens Width</span>
                    <span className="text-[var(--text-muted)] mt-1 block">Horizontal diameter of one optical lens.</span>
                  </div>
                  <div className="p-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)]">
                    <strong className="text-base font-bold text-[var(--accent-gold)] block font-serif">18 mm</strong>
                    <span className="font-bold text-[var(--text-primary)] block mt-1">Bridge Distance</span>
                    <span className="text-[var(--text-muted)] mt-1 block">Distance between lenses over your nose.</span>
                  </div>
                  <div className="p-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)]">
                    <strong className="text-base font-bold text-[var(--accent-gold)] block font-serif">140 mm</strong>
                    <span className="font-bold text-[var(--text-primary)] block mt-1">Temple Arm Length</span>
                    <span className="text-[var(--text-muted)] mt-1 block">Total length of arm from hinge to tip.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Close CTA */}
          <div className="flex justify-end pt-3 border-t border-[var(--border-color)]">
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="btn-gold py-3 px-8 text-xs sm:text-sm font-bold rounded-2xl shadow-lg shadow-[#d4af37]/25"
            >
              Got It, Return to Frames
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
