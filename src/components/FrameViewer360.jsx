import React, { useState, useRef, useEffect } from 'react';
import { RotateCw, MoveHorizontal, Check, Sparkles } from 'lucide-react';

export const FrameViewer360 = ({ product, activeColor }) => {
  const [frameIndex, setFrameIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [autoRotate, setAutoRotate] = useState(false);

  const containerRef = useRef(null);

  // 12 Angle Render Angles (Synthesized SVG Canvas for smooth 360° rotation)
  const TOTAL_FRAMES = 12;

  useEffect(() => {
    let timer = null;
    if (autoRotate && !isDragging) {
      timer = setInterval(() => {
        setFrameIndex((prev) => (prev + 1) % TOTAL_FRAMES);
      }, 150);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [autoRotate, isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || (e.touches && e.touches[0].clientX) || 0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = currentX - startX;

    if (Math.abs(deltaX) > 15) {
      const step = deltaX > 0 ? -1 : 1;
      setFrameIndex((prev) => (prev + step + TOTAL_FRAMES) % TOTAL_FRAMES);
      setStartX(currentX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Color hex fallback
  const frameColorHex = activeColor?.hex || '#d4af37';
  const shape = product?.frameShape || 'Aviator';

  // Rotation Angle calculation
  const rotationAngle = (frameIndex / TOTAL_FRAMES) * 360;

  return (
    <div className="w-full flex flex-col items-center gap-3">
      {/* 360 Viewer Canvas Container */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        className="relative w-full h-[360px] sm:h-[460px] lg:h-[520px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#060913] to-[#0a1020] border border-[var(--border-color)] shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing select-none group"
      >
        {/* Interactive Watermark & Helper Badge */}
        <div className="absolute top-4 left-4 z-10 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
          <RotateCw className={`w-3.5 h-3.5 text-[var(--accent-gold)] ${autoRotate ? 'animate-spin' : ''}`} />
          <span className="text-xs font-bold text-white tracking-wide">360° INTERACTIVE VIEW</span>
        </div>

        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
            autoRotate
              ? 'bg-[#d4af37] text-slate-950 border-[#d4af37] shadow-lg shadow-[#d4af37]/20'
              : 'bg-slate-900/80 text-[var(--text-secondary)] border-white/10 hover:text-white'
          }`}
        >
          {autoRotate ? 'Pause Orbit' : 'Auto Orbit'}
        </button>

        {/* 360 Real Product Photo Image Renderer with 3D Depth Orbit */}
        <div className="relative w-full h-full flex items-center justify-center p-6 sm:p-10">
          <div
            className="relative max-w-full max-h-full flex items-center justify-center transition-all duration-75"
            style={{
              transform: `perspective(800px) rotateY(${rotationAngle}deg) rotateX(${Math.sin((rotationAngle * Math.PI) / 180) * 12}deg) scale(${1 - Math.abs(Math.sin((rotationAngle * Math.PI) / 180)) * 0.12})`,
              transformStyle: 'preserve-3d',
              transition: isDragging ? 'none' : 'transform 0.15s ease-out'
            }}
          >
            {/* Real Product Image */}
            <img
              src={product?.image}
              alt={product?.name || 'Glasses'}
              className="max-h-[260px] sm:max-h-[340px] w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] pointer-events-none rounded-2xl"
              style={{
                filter: activeColor?.hex ? `drop-shadow(0 0 10px ${activeColor.hex}44)` : 'none'
              }}
            />

            {/* Dynamic Glass Lens Glare Sheen Overlay on Rotation */}
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-150"
              style={{
                background: `linear-gradient(${135 + rotationAngle}deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 40%, rgba(6,182,212,0.15) 70%, rgba(212,175,55,0.2) 100%)`,
                opacity: 0.35 + Math.abs(Math.sin((rotationAngle * Math.PI) / 180)) * 0.4
              }}
            />
          </div>
        </div>

        {/* Drag Instruction Banner */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)] shadow-xl pointer-events-none group-hover:border-[#d4af37]/40 group-hover:text-white transition-all">
          <MoveHorizontal className="w-4 h-4 text-[var(--accent-gold)] animate-pulse" />
          <span>DRAG HORIZONTALLY TO ROTATE 360°</span>
        </div>
      </div>

      {/* Frame Angle Stepper Dots */}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: TOTAL_FRAMES }).map((_, idx) => (
          <div
            key={idx}
            onClick={() => setFrameIndex(idx)}
            className={`h-2 rounded-full cursor-pointer transition-all ${
              frameIndex === idx
                ? 'w-6 bg-[var(--accent-gold)] shadow-sm'
                : 'w-2 bg-slate-800 hover:bg-slate-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
