import React, { useState } from 'react';
import { X, Eye, Upload, HelpCircle, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const LENS_TYPES = [
  { id: 'fashion', name: 'Non-Prescription (0.00)', desc: 'Clear lenses with anti-reflective coating', price: 0 },
  { id: 'single-vision', name: 'Single Vision (Distance / Reading)', desc: 'Corrects nearsightedness or farsightedness', price: 2500 },
  { id: 'progressive', name: 'Progressive (No-Line Bifocal)', desc: 'Seamless vision for distance, computer, and reading', price: 5500 }
];

const LENS_COATINGS = [
  { id: 'clear', name: 'Standard Anti-Glare Coating', desc: 'Resists smudges and reflective glare', price: 0 },
  { id: 'blue-block', name: 'Digital Blue Light Filter', desc: 'Blocks 98% harmful screen blue light', price: 1800 },
  { id: 'transitions', name: 'Photochromic Transitions', desc: 'Automatically darkens under sunlight UV', price: 3500 }
];

export const PrescriptionModal = () => {
  const { prescriptionProduct, setPrescriptionProduct, addToCart, setIsSizeGuideOpen, formatPrice } = useStore();

  const [selectedLensType, setSelectedLensType] = useState(LENS_TYPES[1]);
  const [selectedCoating, setSelectedCoating] = useState(LENS_COATINGS[1]);

  const [odSph, setOdSph] = useState('-1.25');
  const [odCyl, setOdCyl] = useState('-0.50');
  const [odAxis, setOdAxis] = useState('90');
  
  const [osSph, setOsSph] = useState('-1.50');
  const [osCyl, setOsCyl] = useState('-0.25');
  const [osAxis, setOsAxis] = useState('85');

  const [pd, setPd] = useState('63');
  const [prescriptionMethod, setPrescriptionMethod] = useState('manual');
  const [fileName, setFileName] = useState('');

  if (!prescriptionProduct) return null;

  const totalLensPrice = selectedLensType.price + selectedCoating.price;
  const totalPrice = prescriptionProduct.price + totalLensPrice;

  const handleAddToCart = () => {
    const prescriptionData = {
      lensType: selectedLensType.name,
      coating: selectedCoating.name,
      lensPrice: totalLensPrice,
      method: prescriptionMethod,
      od: { sph: odSph, cyl: odCyl, axis: odAxis },
      os: { sph: osSph, cyl: osCyl, axis: osAxis },
      pd: pd,
      fileName: fileName
    };

    addToCart(prescriptionProduct, null, prescriptionData);
    setPrescriptionProduct(null);
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-slate-950/85 backdrop-blur-md z-[1000] flex items-center justify-center p-3 sm:p-5 animate-fade-in">
      <div className="glass-panel w-full max-w-3xl max-h-[92vh] rounded-3xl overflow-y-auto flex flex-col shadow-2xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[var(--border-color)] flex items-center justify-between bg-slate-900/80 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#d4af37]/20 text-[var(--accent-gold)] flex items-center justify-center shrink-0">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-[var(--text-primary)] font-serif line-clamp-1">
                Prescription Lens Atelier Customizer
              </h3>
              <span className="text-xs text-[var(--text-muted)] block">
                Configuring Frame: <strong className="text-[var(--accent-gold)]">{prescriptionProduct.name}</strong>
              </span>
            </div>
          </div>

          <button onClick={() => setPrescriptionProduct(null)} className="btn-icon w-9 h-9 shrink-0 rounded-xl">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-8 flex flex-col gap-6">
          {/* Step 1: Lens Usage Type */}
          <div>
            <h4 className="text-xs font-bold text-[var(--accent-gold)] uppercase tracking-wider mb-3">
              1. Select Lens Configuration
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              {LENS_TYPES.map((lt) => (
                <div
                  key={lt.id}
                  onClick={() => setSelectedLensType(lt)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    selectedLensType.id === lt.id
                      ? 'border-[#d4af37] bg-[#d4af37]/20 shadow-md'
                      : 'border-[var(--border-color)] bg-[var(--bg-input)] hover:border-[#d4af37]/40'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start font-bold text-xs sm:text-sm text-[var(--text-primary)] mb-1">
                      <span>{lt.name}</span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">{lt.desc}</p>
                  </div>
                  <div className="text-xs font-mono font-bold text-[var(--accent-gold)] mt-3">
                    +{lt.price === 0 ? 'COMPLIMENTARY' : formatPrice(lt.price)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Lens Coating */}
          <div>
            <h4 className="text-xs font-bold text-[var(--accent-gold)] uppercase tracking-wider mb-3">
              2. Choose Optical Treatment &amp; Coating
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              {LENS_COATINGS.map((lc) => (
                <div
                  key={lc.id}
                  onClick={() => setSelectedCoating(lc)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    selectedCoating.id === lc.id
                      ? 'border-[#d4af37] bg-[#d4af37]/20 shadow-md'
                      : 'border-[var(--border-color)] bg-[var(--bg-input)] hover:border-[#d4af37]/40'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start font-bold text-xs sm:text-sm text-[var(--text-primary)] mb-1">
                      <span>{lc.name}</span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">{lc.desc}</p>
                  </div>
                  <div className="text-xs font-mono font-bold text-[var(--accent-gold)] mt-3">
                    +{lc.price === 0 ? 'COMPLIMENTARY' : formatPrice(lc.price)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Prescription Input */}
          {selectedLensType.id !== 'fashion' && (
            <div>
              <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
                <h4 className="text-xs font-bold text-[var(--accent-gold)] uppercase tracking-wider">
                  3. Prescription Parameters
                </h4>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-[var(--accent-gold)] text-xs flex items-center gap-1 hover:underline cursor-pointer bg-none border-none font-medium"
                >
                  <HelpCircle className="w-3.5 h-3.5" /> Need Pupillary Distance (PD) guidance?
                </button>
              </div>

              {/* Method tabs */}
              <div className="flex gap-2.5 mb-4">
                <button
                  type="button"
                  onClick={() => setPrescriptionMethod('manual')}
                  className={`px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all ${
                    prescriptionMethod === 'manual'
                      ? 'border border-[#d4af37] bg-[#d4af37]/20 text-[var(--accent-gold)]'
                      : 'border border-[var(--border-color)] text-[var(--text-secondary)]'
                  }`}
                >
                  Enter Values Manually
                </button>
                <button
                  type="button"
                  onClick={() => setPrescriptionMethod('upload')}
                  className={`px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
                    prescriptionMethod === 'upload'
                      ? 'border border-[#d4af37] bg-[#d4af37]/20 text-[var(--accent-gold)]'
                      : 'border border-[var(--border-color)] text-[var(--text-secondary)]'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" /> Upload Optometrist Slip
                </button>
              </div>

              {prescriptionMethod === 'manual' ? (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-center bg-[var(--bg-input)] p-4 rounded-2xl border border-[var(--border-color)] shadow-sm">
                    <span className="font-bold text-xs text-[var(--accent-gold)]">OD (Right Eye)</span>
                    <div>
                      <label className="text-[10px] text-[var(--text-muted)] block font-medium">SPH (Sphere)</label>
                      <input type="text" value={odSph} onChange={(e) => setOdSph(e.target.value)} className="input-field py-1.5 px-2 text-xs" placeholder="-1.25" />
                    </div>
                    <div>
                      <label className="text-[10px] text-[var(--text-muted)] block font-medium">CYL (Cylinder)</label>
                      <input type="text" value={odCyl} onChange={(e) => setOdCyl(e.target.value)} className="input-field py-1.5 px-2 text-xs" placeholder="-0.50" />
                    </div>
                    <div>
                      <label className="text-[10px] text-[var(--text-muted)] block font-medium">AXIS (°)</label>
                      <input type="text" value={odAxis} onChange={(e) => setOdAxis(e.target.value)} className="input-field py-1.5 px-2 text-xs" placeholder="90" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-center bg-[var(--bg-input)] p-4 rounded-2xl border border-[var(--border-color)] shadow-sm">
                    <span className="font-bold text-xs text-[var(--accent-gold)]">OS (Left Eye)</span>
                    <div>
                      <label className="text-[10px] text-[var(--text-muted)] block font-medium">SPH (Sphere)</label>
                      <input type="text" value={osSph} onChange={(e) => setOsSph(e.target.value)} className="input-field py-1.5 px-2 text-xs" placeholder="-1.50" />
                    </div>
                    <div>
                      <label className="text-[10px] text-[var(--text-muted)] block font-medium">CYL (Cylinder)</label>
                      <input type="text" value={osCyl} onChange={(e) => setOsCyl(e.target.value)} className="input-field py-1.5 px-2 text-xs" placeholder="-0.25" />
                    </div>
                    <div>
                      <label className="text-[10px] text-[var(--text-muted)] block font-medium">AXIS (°)</label>
                      <input type="text" value={osAxis} onChange={(e) => setOsAxis(e.target.value)} className="input-field py-1.5 px-2 text-xs" placeholder="85" />
                    </div>
                  </div>

                  <div className="max-w-xs">
                    <label className="text-xs text-[var(--text-primary)] font-bold block mb-1">Pupillary Distance (PD in mm)</label>
                    <input type="text" value={pd} onChange={(e) => setPd(e.target.value)} className="input-field py-2 px-3 text-xs" placeholder="63 mm" />
                  </div>
                </div>
              ) : (
                <div className="p-8 border-2 border-dashed border-[#d4af37]/40 rounded-2xl text-center bg-[var(--bg-input)]">
                  <Upload className="w-10 h-10 text-[var(--accent-gold)] mx-auto mb-2" />
                  <p className="text-xs sm:text-sm text-[var(--text-primary)] font-bold mb-1">
                    Drag &amp; drop your optometrist prescription image or PDF
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mb-4">
                    Accepted formats: JPG, PNG, PDF (Max 10MB)
                  </p>
                  <input
                    type="file"
                    onChange={(e) => setFileName(e.target.files[0]?.name || '')}
                    className="hidden"
                    id="rx-upload"
                  />
                  <label htmlFor="rx-upload" className="btn-outline py-2 px-5 text-xs cursor-pointer inline-block rounded-xl font-bold">
                    Choose Prescription Slip...
                  </label>
                  {fileName && (
                    <div className="mt-3 text-xs text-emerald-400 font-bold">
                      ✓ Attached: {fileName}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Pricing Total Summary Box */}
          <div className="p-5 bg-[var(--bg-input)] rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border border-[var(--border-color)]">
            <div>
              <div className="text-xs text-[var(--text-muted)]">
                Frame ({formatPrice(prescriptionProduct.price)}) + Lenses ({formatPrice(totalLensPrice)})
              </div>
              <div className="text-xl sm:text-2xl font-bold text-[var(--accent-gold)] font-mono">
                Total: {formatPrice(totalPrice)}
              </div>
            </div>

            <button onClick={handleAddToCart} className="btn-gold py-3 px-8 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 rounded-2xl shadow-lg shadow-[#d4af37]/25">
              Confirm &amp; Add Lenses to Bag <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
