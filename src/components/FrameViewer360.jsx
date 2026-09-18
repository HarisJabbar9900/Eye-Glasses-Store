import React, { useState, useRef } from 'react';
import { Search, Eye, Sparkles, Ruler } from 'lucide-react';

export const FrameViewer360 = ({ product, activeColor }) => {
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const [loupeActive, setLoupeActive] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, relX: 50, relY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const containerRef = useRef(null);

  const galleryImages = product?.gallery && product.gallery.length > 0
    ? product.gallery
    : [product?.image];

  // Studio Angles Available
  const ANGLES = [
    { id: 'front', label: 'Front View', image: galleryImages[0] || product?.image },
    { id: 'angle', label: '45° Profile', image: galleryImages[1] || galleryImages[0] || product?.image },
    { id: 'macro', label: 'Hinge Detail', image: galleryImages[2] || galleryImages[0] || product?.image },
    { id: 'blueprint', label: 'Blueprint', isBlueprint: true }
  ];

  const currentAngle = ANGLES[activeAngleIndex] || ANGLES[0];
  const activeImage = currentAngle.image || product?.image;

  // Handle Mouse Move for Optical Loupe Magnifier
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const relX = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const relY = Math.max(0, Math.min(100, (y / rect.height) * 100));

    setMousePos({ x, y, relX, relY });
  };

  // Touch handlers for mobile devices
  const handleTouchMove = (e) => {
    if (!containerRef.current || !e.touches || !e.touches[0]) return;
    setIsHovered(true);
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const relX = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const relY = Math.max(0, Math.min(100, (y / rect.height) * 100));

    setMousePos({ x, y, relX, relY });
  };

  const specs = product?.specs || {
    lensWidth: '54 mm',
    bridgeWidth: '18 mm',
    templeLength: '145 mm',
    frameWidth: '140 mm',
    lensHeight: '46 mm'
  };

  return (
    <div className="w-full flex flex-col items-center gap-2.5 sm:gap-3 select-none">
      {/* Studio Viewport */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        onTouchMove={handleTouchMove}
        className="relative w-full h-[240px] xs:h-[280px] sm:h-[360px] lg:h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-[#080c14] to-[#04060a] border border-[var(--border-color)] shadow-2xl flex items-center justify-center cursor-crosshair group touch-none"
      >
        {/* Atelier Quality Seal */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 flex items-center gap-2">
          <span className="bg-black/65 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/10 text-[10px] sm:text-[11px] font-semibold text-[var(--text-primary)] flex items-center gap-1.5 shadow-md">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[var(--accent-gold)]" />
            <span className="truncate max-w-[140px] xs:max-w-none">STUDIO INSPECTOR</span>
          </span>
        </div>

        {/* Studio Controls Header */}
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setLoupeActive(!loupeActive)}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold transition-all border flex items-center gap-1.5 shadow-md ${
              loupeActive
                ? 'bg-[#d4af37]/25 text-[#d4af37] border-[#d4af37]/50'
                : 'bg-black/60 text-slate-400 border-white/10 hover:text-white'
            }`}
          >
            <Search className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Loupe: {loupeActive ? 'ON' : 'OFF'}</span>
          </button>
        </div>

        {/* Blueprint Mode View */}
        {currentAngle.isBlueprint ? (
          <div className="relative w-full h-full p-4 sm:p-6 flex flex-col items-center justify-center bg-[#070b12] overflow-y-auto">
            {/* Architectural Grid Lines */}
            <div 
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(to right, #d4af37 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />

            <div className="relative z-10 max-w-md w-full flex flex-col items-center">
              <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-bold text-[var(--accent-gold)] mb-1 sm:mb-2 flex items-center gap-1">
                <Ruler className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Frame Schematic
              </span>

              <img
                src={product?.image}
                alt="Blueprint frame"
                className="max-h-[140px] xs:max-h-[170px] sm:max-h-[220px] w-auto object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
              />

              {/* Technical Measurement Badges */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 sm:gap-2 mt-3 sm:mt-5 w-full">
                <div className="p-1.5 sm:p-2 rounded-xl bg-white/5 border border-white/10 text-center">
                  <span className="text-[8px] sm:text-[9px] text-[var(--text-muted)] block uppercase">Lens</span>
                  <strong className="text-[11px] sm:text-xs text-[var(--text-primary)] font-mono">{specs.lensWidth}</strong>
                </div>
                <div className="p-1.5 sm:p-2 rounded-xl bg-white/5 border border-white/10 text-center">
                  <span className="text-[8px] sm:text-[9px] text-[var(--text-muted)] block uppercase">Bridge</span>
                  <strong className="text-[11px] sm:text-xs text-[var(--accent-gold)] font-mono">{specs.bridgeWidth}</strong>
                </div>
                <div className="p-1.5 sm:p-2 rounded-xl bg-white/5 border border-white/10 text-center">
                  <span className="text-[8px] sm:text-[9px] text-[var(--text-muted)] block uppercase">Temple</span>
                  <strong className="text-[11px] sm:text-xs text-[var(--text-primary)] font-mono">{specs.templeLength}</strong>
                </div>
                <div className="p-1.5 sm:p-2 rounded-xl bg-white/5 border border-white/10 text-center">
                  <span className="text-[8px] sm:text-[9px] text-[var(--text-muted)] block uppercase">Width</span>
                  <strong className="text-[11px] sm:text-xs text-[var(--text-primary)] font-mono">{specs.frameWidth}</strong>
                </div>
                <div className="p-1.5 sm:p-2 rounded-xl bg-white/5 border border-white/10 text-center col-span-3 sm:col-span-1">
                  <span className="text-[8px] sm:text-[9px] text-[var(--text-muted)] block uppercase">Weight</span>
                  <strong className="text-[11px] sm:text-xs text-emerald-400 font-mono">{product?.weight || '14g'}</strong>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Normal Photo View with Optical Loupe Inspection */
          <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8">
            <img
              src={activeImage}
              alt={product?.name || 'Eyewear Frame'}
              className="max-h-[180px] xs:max-h-[220px] sm:max-h-[290px] w-auto object-contain transition-transform duration-300 pointer-events-none drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
            />

            {/* Precision Optical Magnifier Loupe (touch and mouse responsive) */}
            {loupeActive && isHovered && (
              <div
                className="absolute pointer-events-none rounded-full border-2 border-[var(--accent-gold)] shadow-[0_0_30px_rgba(0,0,0,0.9)] overflow-hidden z-30"
                style={{
                  width: '140px',
                  height: '140px',
                  left: `${mousePos.x}px`,
                  top: `${mousePos.y}px`,
                  transform: 'translate(-50%, -50%)',
                  backgroundImage: `url(${activeImage})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '450%',
                  backgroundPosition: `${mousePos.relX}% ${mousePos.relY}%`,
                  boxShadow: '0 0 0 1px rgba(255,255,255,0.2), 0 10px 30px rgba(0,0,0,0.8)'
                }}
              >
                {/* Loupe Reticle Crosshair */}
                <div className="absolute inset-0 flex items-center justify-center opacity-40">
                  <div className="w-full h-px bg-[var(--accent-gold)]" />
                  <div className="h-full w-px bg-[var(--accent-gold)] absolute" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-[9px] font-mono text-[var(--accent-gold)] border border-white/10">
                  2.5x
                </div>
              </div>
            )}

            {/* Instruction Banner */}
            <div className="absolute bottom-2.5 sm:bottom-3 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] sm:text-[11px] font-medium text-[var(--text-muted)] pointer-events-none flex items-center gap-1.5 transition-opacity duration-200 group-hover:text-white max-w-[90%] truncate">
              <Search className="w-3 h-3 text-[var(--accent-gold)] shrink-0" />
              <span className="truncate">Drag / hover across frame for 2.5x loupe</span>
            </div>
          </div>
        )}
      </div>

      {/* Angle Selector Tabs: wrap gracefully on any screen width */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 w-full">
        {ANGLES.map((ang, idx) => (
          <button
            key={ang.id}
            onClick={() => setActiveAngleIndex(idx)}
            className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold transition-all border flex items-center gap-1.5 ${
              activeAngleIndex === idx
                ? 'bg-[#d4af37] text-slate-950 border-[#d4af37] shadow-md shadow-[#d4af37]/20 font-bold'
                : 'bg-white/5 text-[var(--text-secondary)] border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            {ang.isBlueprint ? <Ruler className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            <span>{ang.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
