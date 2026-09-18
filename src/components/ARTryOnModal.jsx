import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Camera, ZoomIn, ZoomOut, Check, RotateCcw, 
  ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Sparkles, User, HelpCircle, CheckCircle2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { FACE_SHAPE_RECOMMENDATIONS } from '../data/products';

const SAMPLE_FACES = [
  { id: 'male', label: "Men's Fit", desc: 'Structured Jawline', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80', glassPos: { top: '38%', width: '48%' } },
  { id: 'female', label: "Ladies Fit", desc: 'Petite Contours', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80', glassPos: { top: '39%', width: '46%' } },
  { id: 'unisex', label: 'Universal', desc: 'Classic Profile', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80', glassPos: { top: '38%', width: '48%' } }
];

const AVAILABLE_SHAPES = [
  { id: 'Round', name: 'Round Architectural', radiusLeft: '50%', radiusRight: '50%' },
  { id: 'Square', name: 'Square Classic', radiusLeft: '14px', radiusRight: '14px' },
  { id: 'Cat-Eye', name: 'Cat-Eye Statement', radiusLeft: '40px 10px 40px 40px', radiusRight: '10px 40px 40px 40px' },
  { id: 'Aviator', name: 'Aviator Teardrop', radiusLeft: '14px 14px 38px 38px', radiusRight: '14px 14px 38px 38px' },
  { id: 'Wayfarer', name: 'Heritage Wayfarer', radiusLeft: '12px 12px 24px 24px', radiusRight: '12px 12px 24px 24px' },
  { id: 'Oval', name: 'Minimalist Oval', radiusLeft: '50% / 35%', radiusRight: '50% / 35%' },
  { id: 'Geometric', name: 'Octagonal Wire', radiusLeft: '18px 4px 18px 18px', radiusRight: '4px 18px 18px 18px' },
  { id: 'Clubmaster', name: 'Browline Clubmaster', radiusLeft: '16px 16px 28px 28px', radiusRight: '16px 16px 28px 28px' },
  { id: 'Rimless', name: 'Executive Rimless', radiusLeft: '30% / 40%', radiusRight: '30% / 40%' }
];

const AVAILABLE_COLORS = [
  { id: 'gold', name: 'Champagne Gold', hex: '#d4af37' },
  { id: 'black', name: 'Matte Black', hex: '#1e1e1e' },
  { id: 'gunmetal', name: 'Gunmetal Gray', hex: '#4a4e51' },
  { id: 'rosegold', name: 'Rose Gold', hex: '#b76e79' },
  { id: 'tortoise', name: 'Tortoise Shell', hex: '#5c3a21' },
  { id: 'blue', name: 'Midnight Navy', hex: '#1e3a8a' }
];

const LENS_TINTS = [
  { id: 'clear', name: 'Clear AR Anti-Glare', bg: 'rgba(240, 240, 245, 0.2)' },
  { id: 'bluelight', name: 'Blue-Light Shield', bg: 'rgba(6, 182, 212, 0.25)' },
  { id: 'dark', name: 'Polarized Dark Sun', bg: 'rgba(15, 23, 42, 0.7)' },
  { id: 'rose', name: 'Riviera Rose Tint', bg: 'rgba(244, 63, 94, 0.25)' }
];

export const ARTryOnModal = () => {
  const { arProduct, setArProduct, addToCart, addToast, formatPrice } = useStore();

  const [sidebarTab, setSidebarTab] = useState('customize'); // 'customize' | 'faceshape'
  const [useWebcam, setUseWebcam] = useState(false); // default to curated models for instant reliability on all devices
  const [selectedFace, setSelectedFace] = useState(SAMPLE_FACES[0]);
  
  const [activeShape, setActiveShape] = useState('Round');
  const [activeColor, setActiveColor] = useState(AVAILABLE_COLORS[0]);
  const [activeTint, setActiveTint] = useState(LENS_TINTS[0]);
  
  const [scale, setScale] = useState(1.0);
  const [posY, setPosY] = useState(0);
  const [posX, setPosX] = useState(0);
  const [bridgeWidth, setBridgeWidth] = useState(10);

  // Face tracking state
  const [faceDetected, setFaceDetected] = useState(false);
  const [faceTransform, setFaceTransform] = useState({
    xPercent: 50,
    yPercent: 42,
    widthPercent: 44,
    rotationDeg: 0,
    scaleAuto: 1.0
  });

  const videoRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    if (arProduct) {
      const initialShape = arProduct.frameShape || 'Round';
      const found = AVAILABLE_SHAPES.find(s => s.id === initialShape);
      setActiveShape(found ? found.id : 'Round');

      if (arProduct.colors && arProduct.colors.length > 0) {
        const matchingCol = AVAILABLE_COLORS.find(c => c.name === arProduct.colors[0].name);
        if (matchingCol) setActiveColor(matchingCol);
      }
    }
  }, [arProduct]);

  // Real-Time MediaPipe Face Mesh Tracker Setup
  useEffect(() => {
    let active = true;

    if (useWebcam && arProduct && videoRef.current) {
      if (window.FaceMesh && window.Camera) {
        const faceMesh = new window.FaceMesh({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
        });

        faceMesh.setOptions({
          maxNumFaces: 1,
          refineLandmarks: true,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5
        });

        faceMesh.onResults((results) => {
          if (!active) return;

          if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
            setFaceDetected(true);
            const landmarks = results.multiFaceLandmarks[0];

            const leftEye = landmarks[33];
            const rightEye = landmarks[263];
            const noseBridge = landmarks[168];

            if (leftEye && rightEye && noseBridge) {
              const eyeCenterRawX = (leftEye.x + rightEye.x) / 2;
              const eyeCenterX = (1 - eyeCenterRawX) * 100;
              const eyeCenterY = noseBridge.y * 100;

              const dx = (rightEye.x - leftEye.x);
              const dy = (rightEye.y - leftEye.y);
              const eyeDistance = Math.sqrt(dx * dx + dy * dy);

              const angleRad = Math.atan2(dy, dx);
              let angleDeg = -(angleRad * (180 / Math.PI));

              const baseWidthPercent = Math.min(65, Math.max(30, eyeDistance * 210));

              setFaceTransform({
                xPercent: eyeCenterX,
                yPercent: eyeCenterY,
                widthPercent: baseWidthPercent,
                rotationDeg: angleDeg,
                scaleAuto: 1.0
              });
            }
          } else {
            setFaceDetected(false);
          }
        });

        const camera = new window.Camera(videoRef.current, {
          onFrame: async () => {
            if (videoRef.current && active) {
              await faceMesh.send({ image: videoRef.current });
            }
          },
          width: 640,
          height: 480
        });

        camera.start().catch(() => {
          addToast('Webcam access unavailable. Switched to studio face models.', 'info');
          setUseWebcam(false);
        });

        cameraRef.current = camera;

        return () => {
          active = false;
          try {
            camera.stop();
          } catch (_) {}
        };
      }
    }
  }, [useWebcam, arProduct]);

  if (!arProduct) return null;

  const currentShapeObj = AVAILABLE_SHAPES.find((s) => s.id === activeShape) || AVAILABLE_SHAPES[0];

  const resetAdjustments = () => {
    setScale(1.0);
    setPosY(0);
    setPosX(0);
    setBridgeWidth(10);
  };

  const frameLeft = useWebcam 
    ? `${faceTransform.xPercent}%` 
    : '50%';

  const frameTop = useWebcam 
    ? `${faceTransform.yPercent}%` 
    : selectedFace.glassPos.top;

  const frameWidth = useWebcam 
    ? `${faceTransform.widthPercent}%` 
    : selectedFace.glassPos.width;

  const frameRotate = useWebcam ? faceTransform.rotationDeg : 0;

  return (
    <div className="fixed inset-0 w-screen h-screen bg-slate-950/90 backdrop-blur-xl z-[1000] flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in">
      <div className="glass-panel w-full max-w-5xl max-h-[96vh] md:max-h-[92vh] rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
        {/* Modal Header */}
        <div className="p-3.5 sm:p-5 border-b border-[var(--border-color)] flex items-center justify-between bg-slate-900/90 sticky top-0 z-20">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#d4af37]/20 border border-[#d4af37]/30 text-[var(--accent-gold)] flex items-center justify-center shrink-0 shadow-md">
              <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs sm:text-base md:text-lg font-bold text-[var(--text-primary)] font-serif truncate">
                Virtual Fitting Mirror &amp; Proportion Studio
              </h3>
              <div className="text-[10px] sm:text-xs text-[var(--text-muted)] flex items-center gap-2 truncate">
                <span>Model: <strong className="text-[var(--accent-gold)]">{arProduct.name}</strong></span>
                {useWebcam && (
                  <span className={`hidden xs:inline px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold border ${
                    faceDetected 
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                      : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                  }`}>
                    {faceDetected ? '● Calibrated' : '○ Align Face'}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => setArProduct(null)}
            className="btn-icon w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-xl"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Studio Body: responsive grid that stacks on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 min-h-0 overflow-y-auto">
          
          {/* Viewfinder Mirror Area */}
          <div className="lg:col-span-7 relative bg-[#03050a] flex items-center justify-center overflow-hidden h-[250px] xs:h-[290px] sm:h-[380px] lg:h-[480px] shrink-0 border-b lg:border-b-0 lg:border-r border-[var(--border-color)]">
            {useWebcam ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover -scale-x-100"
              />
            ) : (
              <img
                src={selectedFace.img}
                alt={selectedFace.label}
                className="w-full h-full object-cover"
              />
            )}

            {/* Overlaid Glasses Frame Graphic */}
            <div
              className="absolute pointer-events-none transition-all duration-75 flex items-center justify-center"
              style={{
                top: frameTop,
                left: frameLeft,
                width: frameWidth,
                transform: `translate(-50%, -50%) translate(${posX}px, ${posY}px) rotate(${frameRotate}deg) scale(${scale})`
              }}
            >
              <div className="relative w-full flex items-center justify-between p-0.5">
                {/* Left Lens Rim */}
                <div 
                  className="h-10 xs:h-12 sm:h-16 relative transition-all duration-200"
                  style={{
                    width: `${(100 - bridgeWidth) / 2}%`,
                    borderRadius: currentShapeObj.radiusLeft,
                    border: `3px solid ${activeColor.hex}`,
                    background: activeTint.bg,
                    backdropFilter: 'blur(1px)',
                    boxShadow: `0 0 10px ${activeColor.hex}44, inset 0 0 10px rgba(255,255,255,0.3)`
                  }}
                >
                  <div className="absolute top-2 left-2 w-1/3 h-0.5 bg-white/70 -rotate-45 rounded-full" />
                </div>

                {/* Metallic Bridge */}
                <div 
                  className="h-1 sm:h-1.5 rounded-full"
                  style={{
                    width: `${bridgeWidth}%`,
                    backgroundColor: activeColor.hex,
                    boxShadow: `0 0 6px ${activeColor.hex}44`
                  }} 
                />

                {/* Right Lens Rim */}
                <div 
                  className="h-10 xs:h-12 sm:h-16 relative transition-all duration-200"
                  style={{
                    width: `${(100 - bridgeWidth) / 2}%`,
                    borderRadius: currentShapeObj.radiusRight,
                    border: `3px solid ${activeColor.hex}`,
                    background: activeTint.bg,
                    backdropFilter: 'blur(1px)',
                    boxShadow: `0 0 10px ${activeColor.hex}44, inset 0 0 10px rgba(255,255,255,0.3)`
                  }}
                >
                  <div className="absolute top-2 left-2 w-1/3 h-0.5 bg-white/70 -rotate-45 rounded-full" />
                </div>
              </div>
            </div>

            {/* Position & Scale Alignment Floating Pill */}
            <div className="absolute bottom-2.5 sm:bottom-4 left-1/2 -translate-x-1/2 bg-black/85 backdrop-blur-md px-2.5 sm:px-4 py-1.5 rounded-full flex items-center gap-1.5 sm:gap-2.5 border border-white/15 shadow-2xl max-w-[95%] overflow-x-auto">
              <span className="text-[9px] sm:text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider hidden sm:inline">ALIGN:</span>
              
              <div className="flex gap-1">
                <button onClick={() => setPosX((x) => x - 3)} className="btn-icon w-6 h-6 sm:w-7 sm:h-7 rounded-lg" title="Move Left">
                  <ArrowLeft className="w-3 h-3" />
                </button>
                <button onClick={() => setPosX((x) => x + 3)} className="btn-icon w-6 h-6 sm:w-7 sm:h-7 rounded-lg" title="Move Right">
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button onClick={() => setPosY((y) => y - 3)} className="btn-icon w-6 h-6 sm:w-7 sm:h-7 rounded-lg" title="Move Up">
                  <ArrowUp className="w-3 h-3" />
                </button>
                <button onClick={() => setPosY((y) => y + 3)} className="btn-icon w-6 h-6 sm:w-7 sm:h-7 rounded-lg" title="Move Down">
                  <ArrowDown className="w-3 h-3" />
                </button>
              </div>

              <div className="w-px h-4 bg-white/10" />

              <button onClick={() => setScale((s) => Math.max(0.6, s - 0.05))} className="btn-icon w-6 h-6 sm:w-7 sm:h-7 rounded-lg" title="Scale Down">
                <ZoomOut className="w-3 h-3" />
              </button>
              <span className="text-[10px] sm:text-xs font-mono font-bold text-[var(--accent-gold)] px-0.5">
                {Math.round(scale * 100)}%
              </span>
              <button onClick={() => setScale((s) => Math.min(1.6, s + 0.05))} className="btn-icon w-6 h-6 sm:w-7 sm:h-7 rounded-lg" title="Scale Up">
                <ZoomIn className="w-3 h-3" />
              </button>

              <div className="w-px h-4 bg-white/10" />

              <button onClick={resetAdjustments} className="btn-icon w-6 h-6 sm:w-7 sm:h-7 rounded-lg" title="Reset Calibration">
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Right Control Sidebar */}
          <div className="lg:col-span-5 p-4 sm:p-6 bg-[var(--bg-secondary)] flex flex-col gap-4 overflow-y-auto">
            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-white/5 rounded-2xl border border-white/10">
              <button
                onClick={() => setSidebarTab('customize')}
                className={`py-2 text-xs font-semibold rounded-xl transition-all ${
                  sidebarTab === 'customize'
                    ? 'bg-[#d4af37] text-slate-950 font-bold shadow-md'
                    : 'text-[var(--text-secondary)] hover:text-white'
                }`}
              >
                Frame Customizer
              </button>
              <button
                onClick={() => setSidebarTab('faceshape')}
                className={`py-2 text-xs font-semibold rounded-xl transition-all ${
                  sidebarTab === 'faceshape'
                    ? 'bg-[#d4af37] text-slate-950 font-bold shadow-md'
                    : 'text-[var(--text-secondary)] hover:text-white'
                }`}
              >
                Face Shape Guide
              </button>
            </div>

            {sidebarTab === 'faceshape' ? (
              /* Face Shape Advisor View */
              <div className="flex flex-col gap-3 py-1">
                <div className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Optical balance contrasts your jawline with complementary frame geometry:
                </div>

                <div className="flex flex-col gap-2.5 max-h-[340px] overflow-y-auto pr-1">
                  {FACE_SHAPE_RECOMMENDATIONS.map((fs) => (
                    <div key={fs.shape} className="p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                      <div className="flex items-center justify-between mb-1">
                        <strong className="text-xs text-[var(--accent-gold)] font-serif">{fs.shape}</strong>
                        <span className="text-[10px] text-emerald-400 font-mono">Recommended</span>
                      </div>
                      <p className="text-[11px] text-[var(--text-secondary)] mb-2 leading-tight">{fs.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {fs.recommendedStyles.map((style) => (
                          <button
                            key={style}
                            onClick={() => {
                              setActiveShape(style);
                              setSidebarTab('customize');
                            }}
                            className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-white/5 border border-white/10 text-white hover:border-[#d4af37]"
                          >
                            Try {style} &rarr;
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Customize Controls View */
              <>
                {/* 1. Viewport Source Switcher */}
                <div>
                  <h5 className="text-[10px] sm:text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                    Fitting Mode
                  </h5>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setUseWebcam(true)}
                      className={`p-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        useWebcam 
                          ? 'border-[#d4af37] bg-[#d4af37]/20 text-[var(--accent-gold)] font-bold shadow-sm' 
                          : 'border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-secondary)]'
                      }`}
                    >
                      <Camera className="w-3.5 h-3.5" /> Live Camera
                    </button>
                    <button
                      onClick={() => setUseWebcam(false)}
                      className={`p-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        !useWebcam 
                          ? 'border-[#d4af37] bg-[#d4af37]/20 text-[var(--accent-gold)] font-bold shadow-sm' 
                          : 'border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-secondary)]'
                      }`}
                    >
                      Face Profiles
                    </button>
                  </div>
                </div>

                {/* Face Profiles Picker */}
                {!useWebcam && (
                  <div>
                    <h5 className="text-[10px] sm:text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                      Choose Facial Profile
                    </h5>
                    <div className="grid grid-cols-3 gap-2">
                      {SAMPLE_FACES.map((f) => (
                        <div
                          key={f.id}
                          onClick={() => setSelectedFace(f)}
                          className={`p-2 rounded-2xl border text-center cursor-pointer transition-all ${
                            selectedFace.id === f.id 
                              ? 'border-[#d4af37] bg-[var(--bg-card-hover)] shadow-md ring-1 ring-[#d4af37]/30' 
                              : 'border-[var(--border-color)] bg-[var(--bg-input)] opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={f.img} alt={f.label} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover mx-auto mb-1 shadow-sm border border-white/10" />
                          <div className="font-semibold text-[11px] sm:text-xs text-[var(--text-primary)] leading-tight">{f.label}</div>
                          <div className="text-[9px] text-[var(--text-muted)] hidden xs:block truncate">{f.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Shape Selection */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <h5 className="text-[10px] sm:text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                      Frame Silhouette
                    </h5>
                    <span className="text-xs text-[var(--accent-gold)] font-bold font-mono">
                      {activeShape}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 max-h-32 sm:max-h-36 overflow-y-auto pr-1">
                    {AVAILABLE_SHAPES.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setActiveShape(s.id)}
                        className={`p-2 rounded-xl text-[10px] sm:text-[11px] font-semibold text-center border cursor-pointer transition-all truncate ${
                          activeShape === s.id 
                            ? 'border-[#d4af37] bg-[#d4af37]/20 text-[var(--accent-gold)] font-bold' 
                            : 'border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-secondary)] hover:border-[#d4af37]/30'
                        }`}
                      >
                        {s.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Rim Finish Color */}
                <div>
                  <h5 className="text-[10px] sm:text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                    Rim Metallurgy: <strong className="text-[var(--accent-gold)] font-sans">{activeColor.name}</strong>
                  </h5>
                  <div className="flex flex-wrap items-center gap-2">
                    {AVAILABLE_COLORS.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setActiveColor(c)}
                        className={`w-6 h-6 rounded-full transition-all cursor-pointer ${
                          activeColor.id === c.id ? 'ring-2 ring-[var(--accent-gold)] ring-offset-2 scale-110' : 'opacity-75 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                {/* 4. Lens Tint Coating */}
                <div>
                  <h5 className="text-[10px] sm:text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                    Optical Lens Filter
                  </h5>
                  <div className="grid grid-cols-2 gap-1.5">
                    {LENS_TINTS.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setActiveTint(t)}
                        className={`p-1.5 rounded-xl text-[10px] sm:text-[11px] border cursor-pointer text-center transition-all ${
                          activeTint.id === t.id 
                            ? 'border-[#d4af37] bg-[#d4af37]/20 text-[var(--accent-gold)] font-bold' 
                            : 'border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-secondary)]'
                        }`}
                      >
                        {t.name}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Bottom Actions */}
            <div className="mt-auto flex flex-col gap-2 pt-3 border-t border-[var(--border-color)]">
              <button
                onClick={() => {
                  addToCart(arProduct, { name: activeColor.name, hex: activeColor.hex });
                  setArProduct(null);
                }}
                className="btn-gold w-full py-3 text-xs sm:text-sm font-bold rounded-2xl shadow-lg shadow-[#d4af37]/25"
              >
                Add Frame to Bag ({formatPrice(arProduct.price)})
              </button>

              <button
                onClick={() => setArProduct(null)}
                className="btn-outline w-full py-2 text-xs rounded-xl font-medium"
              >
                Close Fitting Mirror
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
