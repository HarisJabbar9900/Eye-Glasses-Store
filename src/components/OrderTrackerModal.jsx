import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, Truck, ShieldCheck, Eye, Package, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrderTrackerModal = () => {
  const { isOrderTrackerOpen, setIsOrderTrackerOpen, trackedOrder, trackOrder } = useStore();
  const [inputCode, setInputCode] = useState('');

  if (!isOrderTrackerOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputCode.trim()) {
      trackOrder(inputCode.trim());
    }
  };

  const STAGES = [
    {
      step: 1,
      title: "Rx Script Validation",
      desc: "Licensed optometrist verified diopters (SPH, CYL, Axis, PD)",
      time: "Completed • Day 1",
      icon: Eye
    },
    {
      step: 2,
      title: "Precision Lens Surfacing",
      desc: "Diamond-cut CR-39 / High-Index blanks & vacuum AR hard-coating",
      time: "Completed • Day 2",
      icon: ShieldCheck
    },
    {
      step: 3,
      title: "Atelier Glazing & Calibration",
      desc: "Bevel mounting into frame, optical center alignment & 12-point QA check",
      time: "In Progress • Today",
      icon: Package
    },
    {
      step: 4,
      title: "White-Glove Dispatch",
      desc: "Packaged in leather hard case, micro-fiber pouch & certified warranty card",
      time: "Pending Dispatch",
      icon: Truck
    }
  ];

  const currentStage = trackedOrder?.stage || 3;

  return (
    <div className="fixed inset-0 w-screen h-screen bg-slate-950/85 backdrop-blur-md z-[1000] flex items-center justify-center p-3 sm:p-5 animate-fade-in">
      <div className="glass-panel w-full max-w-2xl max-h-[92vh] rounded-3xl overflow-y-auto flex flex-col shadow-2xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[var(--border-color)] flex items-center justify-between bg-slate-900/80 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#d4af37]/20 border border-[#d4af37]/30 flex items-center justify-center text-[var(--accent-gold)]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] font-serif">
                Optical Lab Order Tracker
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Live prescription glazing and courier transit telemetry
              </p>
            </div>
          </div>

          <button onClick={() => setIsOrderTrackerOpen(false)} className="btn-icon w-9 h-9 shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tracker Search Input */}
        <div className="p-5 sm:p-6 border-b border-[var(--border-color)] bg-white/[0.02]">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="Enter Order Reference (e.g. LUMEN-892144)..."
                className="input-field pl-10 py-2.5 text-xs sm:text-sm"
              />
            </div>
            <button type="submit" className="btn-gold px-5 py-2.5 text-xs sm:text-sm font-bold shrink-0">
              Track Status
            </button>
          </form>

          <div className="flex items-center gap-2 mt-2.5 text-[11px] text-[var(--text-muted)]">
            <span>Quick Sample:</span>
            <button
              type="button"
              onClick={() => {
                setInputCode('LUMEN-892144');
                trackOrder('LUMEN-892144');
              }}
              className="text-[var(--accent-gold)] hover:underline font-mono"
            >
              LUMEN-892144
            </button>
          </div>
        </div>

        {/* Order Details Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-500/10 to-transparent border-b border-[var(--border-color)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[10px] text-[var(--accent-gold)] font-bold tracking-wider uppercase block">
                ORDER REFERENCE
              </span>
              <h4 className="text-lg font-bold text-[var(--text-primary)] font-mono">
                {trackedOrder?.id || 'LUMEN-892144'}
              </h4>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-[var(--text-muted)] uppercase block">ESTIMATED ARRIVAL</span>
              <span className="text-xs sm:text-sm font-bold text-emerald-400">
                {trackedOrder?.estimatedDelivery || 'Tomorrow by 4:00 PM'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 pt-3 border-t border-white/10 text-xs">
            <div>
              <span className="text-[10px] text-[var(--text-muted)] block">Item</span>
              <span className="text-[var(--text-primary)] font-medium line-clamp-1">{trackedOrder?.item}</span>
            </div>
            <div>
              <span className="text-[10px] text-[var(--text-muted)] block">Courier Partner</span>
              <span className="text-[var(--text-primary)] font-medium">{trackedOrder?.carrier}</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[10px] text-[var(--text-muted)] block">Tracking Code</span>
              <span className="text-[var(--accent-gold)] font-mono">{trackedOrder?.trackingNumber}</span>
            </div>
          </div>
        </div>

        {/* Timeline Stepper */}
        <div className="p-5 sm:p-7 flex flex-col gap-6">
          <h5 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
            OPTICAL LAB &amp; DISPATCH PROGRESS
          </h5>

          <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 before:h-full before:w-0.5 before:bg-white/10">
            {STAGES.map((s) => {
              const isPast = s.step < currentStage;
              const isCurrent = s.step === currentStage;
              const Icon = s.icon;

              return (
                <div key={s.step} className="relative flex items-start gap-4">
                  {/* Step Icon Badge */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-all ${
                      isPast
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                        : isCurrent
                        ? 'bg-[var(--accent-gold)] text-slate-950 shadow-md shadow-[#d4af37]/30 ring-4 ring-[#d4af37]/20 animate-pulse'
                        : 'bg-slate-800 text-slate-400 border border-white/10'
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>

                  {/* Step Description */}
                  <div className="flex-1 pt-0.5">
                    <div className="flex items-center justify-between">
                      <h6
                        className={`text-xs sm:text-sm font-bold ${
                          isCurrent
                            ? 'text-[var(--accent-gold)]'
                            : isPast
                            ? 'text-[var(--text-primary)]'
                            : 'text-[var(--text-muted)]'
                        }`}
                      >
                        {s.title}
                      </h6>
                      <span className="text-[10px] text-[var(--text-muted)] font-mono">{s.time}</span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-[var(--border-color)] bg-slate-900/60 flex justify-end">
          <button
            onClick={() => setIsOrderTrackerOpen(false)}
            className="btn-outline px-6 py-2 text-xs font-semibold"
          >
            Close Tracker
          </button>
        </div>
      </div>
    </div>
  );
};
