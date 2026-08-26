import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Camera, ZoomIn, ZoomOut, Check, RotateCcw, 
  ArrowLeft, ArrowRight, ArrowUp, ArrowDown 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

const SAMPLE_FACES = [
  { id: 'male', name: 'Model 1 (Gents)', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80', glassPos: { top: '38%', width: '48%' } },
  { id: 'female', name: 'Model 2 (Ladies)', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80', glassPos: { top: '39%', width: '46%' } },
  { id: 'unisex', name: 'Model 3 (Unisex)', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80', glassPos: { top: '38%', width: '48%' } }
];

const AVAILABLE_SHAPES = [
  { id: 'Round', name: 'Round (Gol)', radiusLeft: '50%', radiusRight: '50%' },
  { id: 'Square', name: 'Square (Chaukhat)', radiusLeft: '14px', radiusRight: '14px' },
  { id: 'Cat-Eye', name: 'Cat-Eye', radiusLeft: '40px 10px 40px 40px', radiusRight: '10px 40px 40px 40px' },
  { id: 'Aviator', name: 'Aviator (Drop)', radiusLeft: '14px 14px 38px 38px', radiusRight: '14px 14px 38px 38px' },
  { id: 'Wayfarer', name: 'Wayfarer', radiusLeft: '12px 12px 24px 24px', radiusRight: '12px 12px 24px 24px' },
  { id: 'Oval', name: 'Oval (Baizvi)', radiusLeft: '50% / 35%', radiusRight: '50% / 35%' },
  { id: 'Geometric', name: 'Geometric (Polygonal)', radiusLeft: '18px 4px 18px 18px', radiusRight: '4px 18px 18px 18px' },
  { id: 'Clubmaster', name: 'Clubmaster (Browline)', radiusLeft: '16px 16px 28px 28px', radiusRight: '16px 16px 28px 28px' },
  { id: 'Rimless', name: 'Rimless (Frameless Minimal)', radiusLeft: '30% / 40%', radiusRight: '30% / 40%' },
  { id: 'Hexagonal', name: 'Hexagonal (6-Corner)', radiusLeft: '22px 6px 22px 6px', radiusRight: '6px 22px 6px 22px' },
  { id: 'Octagonal', name: 'Octagonal (8-Corner)', radiusLeft: '14px 8px 14px 8px', radiusRight: '8px 14px 8px 14px' },
  { id: 'Shield', name: 'Shield (Single Visor)', radiusLeft: '8px 24px 12px 12px', radiusRight: '24px 8px 12px 12px' }
];

const AVAILABLE_COLORS = [
  { id: 'black', name: 'Matte Black', hex: '#1e1e1e' },
  { id: 'gold', name: 'Champagne Gold', hex: '#d4af37' },
  { id: 'gunmetal', name: 'Gunmetal Gray', hex: '#4a4e51' },
  { id: 'rosegold', name: 'Rose Gold', hex: '#b76e79' },
  { id: 'blue', name: 'Royal Navy Blue', hex: '#1e3a8a' },
  { id: 'tortoise', name: 'Tortoise Shell', hex: '#5c3a21' }
];

const LENS_TINTS = [
  { id: 'clear', name: 'Clear AR', bg: 'rgba(240, 240, 245, 0.2)' },
  { id: 'bluelight', name: 'Blue Light Shield', bg: 'rgba(6, 182, 212, 0.25)' },
  { id: 'dark', name: 'Dark UV Sunglasses', bg: 'rgba(15, 23, 42, 0.7)' },
  { id: 'rose', name: 'Rose Gold Tint', bg: 'rgba(244, 63, 94, 0.25)' }
];

export const ARTryOnModal = () => {
  const { arProduct, setArProduct, addToCart, addToast } = useStore();

  const [useWebcam, setUseWebcam] = useState(true);
  const [selectedFace, setSelectedFace] = useState(SAMPLE_FACES[0]);
  
  const [activeShape, setActiveShape] = useState('Round');
  const [activeColor, setActiveColor] = useState(AVAILABLE_COLORS[0]);
  const [activeTint, setActiveTint] = useState(LENS_TINTS[1]);
  
  const [scale, setScale] = useState(1.0);
  const [posY, setPosY] = useState(0);
  const [posX, setPosX] = useState(0);
  const [bridgeWidth, setBridgeWidth] = useState(10);

  // MediaPipe FaceMesh state tracking
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

            // Key landmarks:
            // 33: Left eye outer corner, 263: Right eye outer corner
            // 168: Bridge of nose between eyes, 1: Nose tip
            const leftEye = landmarks[33];
            const rightEye = landmarks[263];
            const noseBridge = landmarks[168];

            if (leftEye && rightEye && noseBridge) {
              // Video is mirrored horizontally (-scale-x-100), so flip X coordinate:
              const eyeCenterRawX = (leftEye.x + rightEye.x) / 2;
              const eyeCenterX = (1 - eyeCenterRawX) * 100;
              const eyeCenterY = noseBridge.y * 100;

              // Eye distance calculation for frame scale
              const dx = (rightEye.x - leftEye.x);
              const dy = (rightEye.y - leftEye.y);
              const eyeDistance = Math.sqrt(dx * dx + dy * dy);

              // Head roll angle (in degrees)
              const angleRad = Math.atan2(dy, dx);
              let angleDeg = -(angleRad * (180 / Math.PI)); // Negated for mirrored canvas

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
          addToast('Webcam hardware error. Switched to face models.', 'error');
          setUseWebcam(false);
        });

        cameraRef.current = camera;
      } else {
        // Basic getUserMedia fallback if scripts not loaded yet
        navigator.mediaDevices?.getUserMedia({ video: { width: 640, height: 480 } })
          .then((stream) => {
            if (videoRef.current) videoRef.current.srcObject = stream;
          })
          .catch(() => setUseWebcam(false));
      }
    }

    return () => {
      active = false;
      if (cameraRef.current) {
        try { cameraRef.current.stop(); } catch (e) {}
      }
    };
  }, [useWebcam, arProduct]);

  if (!arProduct) return null;

  const currentShapeObj = AVAILABLE_SHAPES.find(s => s.id === activeShape) || AVAILABLE_SHAPES[0];

  const resetAdjustments = () => {
    setScale(1.0);
    setPosX(0);
    setPosY(0);
    setBridgeWidth(10);
  };

  const frameTop = useWebcam 
    ? `${faceTransform.yPercent}%` 
    : selectedFace.glassPos.top;

  const frameLeft = useWebcam 
    ? `${faceTransform.xPercent}%` 
    : '50%';

  const frameWidth = useWebcam 
    ? `${faceTransform.widthPercent}%` 
    : selectedFace.glassPos.width;

  const frameRotate = useWebcam ? faceTransform.rotationDeg : 0;

  return (
    <div className="fixed inset-0 w-screen h-screen bg-slate-950/90 backdrop-blur-xl z-[1000] flex items-center justify-center p-3 sm:p-5 animate-fade-in">
      <div className="glass-panel w-full max-w-5xl max-h-[94vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl bg-[var(--bg-primary)]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[var(--border-color)] flex items-center justify-between bg-slate-900/90 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-[var(--text-primary)] font-serif line-clamp-1">
                Virtual AR Fitting Studio &amp; Lens Customizer
              </h3>
              <span className="text-xs text-[var(--text-muted)] flex items-center gap-2">
                Active Frame: <strong className="text-[var(--accent-gold)]">{arProduct.name}</strong>
                {useWebcam && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${faceDetected ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                    {faceDetected ? '● AI 3D Mesh Active' : '○ Detecting Face...'}
                  </span>
                )}
              </span>
            </div>
          </div>

          <button
            onClick={() => setArProduct(null)}
            className="btn-icon w-9 h-9 shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 min-h-0 overflow-y-auto lg:overflow-hidden">
          
          {/* Viewfinder Mirror Area (Col 7 on lg) */}
          <div className="lg:col-span-7 relative bg-[#03050a] flex items-center justify-center overflow-hidden min-h-[320px] sm:min-h-[400px] lg:min-h-[480px]">
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
                alt="Face Model"
                className="w-full h-full object-cover"
              />
            )}

            {/* Overlaid Glasses Frame Graphic with Real-Time 3D Mesh Landmarks & Motion */}
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
                {/* Left Lens */}
                <div 
                  className="h-12 sm:h-16 relative transition-all duration-200"
                  style={{
                    width: `${(100 - bridgeWidth) / 2}%`,
                    borderRadius: currentShapeObj.radiusLeft,
                    border: `3px solid ${activeColor.hex}`,
                    background: activeTint.bg,
                    backdropFilter: 'blur(1px)',
                    boxShadow: `0 0 12px ${activeColor.hex}44, inset 0 0 12px rgba(255,255,255,0.4)`
                  }}
                >
                  <div className="absolute top-2 left-2 w-1/3 h-0.5 bg-white/70 -rotate-45 rounded-full" />
                </div>

                {/* Bridge */}
                <div 
                  className="h-1.5 rounded-full"
                  style={{
                    width: `${bridgeWidth}%`,
                    backgroundColor: activeColor.hex,
                    boxShadow: `0 0 6px ${activeColor.hex}44`
                  }} 
                />

                {/* Right Lens */}
                <div 
                  className="h-12 sm:h-16 relative transition-all duration-200"
                  style={{
                    width: `${(100 - bridgeWidth) / 2}%`,
                    borderRadius: currentShapeObj.radiusRight,
                    border: `3px solid ${activeColor.hex}`,
                    background: activeTint.bg,
                    backdropFilter: 'blur(1px)',
                    boxShadow: `0 0 12px ${activeColor.hex}44, inset 0 0 12px rgba(255,255,255,0.4)`
                  }}
                >
                  <div className="absolute top-2 left-2 w-1/3 h-0.5 bg-white/70 -rotate-45 rounded-full" />
                </div>
              </div>
            </div>

            {/* Position & Scale Direct Overlay Controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-3 border border-[var(--border-color)] shadow-xl max-w-[95%] overflow-x-auto">
              <span className="text-[10px] text-[var(--text-muted)] font-bold hidden sm:inline">ALIGN:</span>
              
              <div className="flex gap-1.5">
                <button onClick={() => setPosX((x) => x - 3)} className="btn-icon w-7 h-7" title="Move Left">
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setPosX((x) => x + 3)} className="btn-icon w-7 h-7" title="Move Right">
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setPosY((y) => y - 3)} className="btn-icon w-7 h-7" title="Move Up">
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setPosY((y) => y + 3)} className="btn-icon w-7 h-7" title="Move Down">
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="w-px h-5 bg-[var(--border-color)]" />

              <button onClick={() => setScale((s) => Math.max(0.6, s - 0.05))} className="btn-icon w-7 h-7" title="Zoom Out">
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-bold text-cyan-400">
                {Math.round(scale * 100)}%
              </span>
              <button onClick={() => setScale((s) => Math.min(1.6, s + 0.05))} className="btn-icon w-7 h-7" title="Zoom In">
                <ZoomIn className="w-3.5 h-3.5" />
              </button>

              <div className="w-px h-5 bg-[var(--border-color)]" />

              <button onClick={resetAdjustments} className="btn-icon w-7 h-7" title="Reset Alignment">
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Control Sidebar (Col 5 on lg) */}
          <div className="lg:col-span-5 p-6 bg-[var(--bg-secondary)] flex flex-col gap-5 border-t lg:border-t-0 lg:border-l border-[var(--border-color)] lg:overflow-y-auto">
            {/* 1. Camera Input Switcher */}
            <div>
              <h5 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2.5">
                Camera Source
              </h5>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => setUseWebcam(true)}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    useWebcam 
                      ? 'border-cyan-400 bg-cyan-500/20 text-cyan-400 shadow-md' 
                      : 'border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-secondary)]'
                  }`}
                >
                  <Camera className="w-4 h-4" /> Live Webcam
                </button>
                <button
                  onClick={() => setUseWebcam(false)}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    !useWebcam 
                      ? 'border-[#d4af37] bg-[#d4af37]/20 text-[var(--accent-gold)] shadow-md' 
                      : 'border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-secondary)]'
                  }`}
                >
                  Model Faces
                </button>
              </div>
            </div>

            {/* Model Faces Picker */}
            {!useWebcam && (
              <div>
                <h5 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2.5">
                  Face Model
                </h5>
                <div className="flex gap-2.5">
                  {SAMPLE_FACES.map((f) => (
                    <div
                      key={f.id}
                      onClick={() => setSelectedFace(f)}
                      className={`flex-1 p-2 rounded-xl border text-center text-xs cursor-pointer transition-all ${
                        selectedFace.id === f.id ? 'border-[#d4af37] bg-[var(--bg-card-hover)] shadow-sm' : 'border-[var(--border-color)] bg-[var(--bg-input)] opacity-70'
                      }`}
                    >
                      <img src={f.img} alt={f.name} className="w-9 h-9 rounded-full object-cover mx-auto mb-1.5 shadow-sm" />
                      <div className="font-medium line-clamp-1">{f.name.split(' ')[0]}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. LENS FRAME SHAPE SELECTOR */}
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <h5 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  Lens Shape
                </h5>
                <span className="text-xs text-[var(--accent-gold)] font-bold">
                  {activeShape}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {AVAILABLE_SHAPES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveShape(s.id)}
                    className={`p-2.5 rounded-xl text-xs font-semibold text-left flex items-center justify-between border cursor-pointer transition-all ${
                      activeShape === s.id 
                        ? 'border-[#d4af37] bg-[#d4af37]/20 text-[var(--accent-gold)] shadow-sm' 
                        : 'border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-secondary)] hover:border-[#d4af37]/30'
                    }`}
                  >
                    <span className="line-clamp-1">{s.name}</span>
                    {activeShape === s.id && <Check className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. FRAME COLOR SELECTOR */}
            <div>
              <h5 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2.5">
                Frame Rim Finish
              </h5>
              <div className="flex flex-wrap items-center gap-2.5">
                {AVAILABLE_COLORS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveColor(c)}
                    className={`w-7 h-7 rounded-full transition-all cursor-pointer ${
                      activeColor.id === c.id ? 'ring-2 ring-[var(--accent-gold)] ring-offset-2 scale-110' : 'opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
                <span className="text-xs text-[var(--text-muted)] ml-1 font-medium">
                  {activeColor.name}
                </span>
              </div>
            </div>

            {/* 4. LENS TINT SELECTOR */}
            <div>
              <h5 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2.5">
                Lens Tint &amp; Shield Coating
              </h5>
              <div className="grid grid-cols-2 gap-2">
                {LENS_TINTS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTint(t)}
                    className={`p-2 rounded-xl text-xs border cursor-pointer text-center font-medium transition-all ${
                      activeTint.id === t.id 
                        ? 'border-cyan-400 bg-cyan-500/20 text-cyan-400 font-bold shadow-sm' 
                        : 'border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-secondary)]'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-auto flex flex-col gap-2.5 pt-3 border-t border-[var(--border-color)]">
              <button
                onClick={() => {
                  addToCart(arProduct, { name: activeColor.name, hex: activeColor.hex });
                  setArProduct(null);
                }}
                className="btn-gold w-full py-3 text-sm font-bold rounded-2xl shadow-lg shadow-[#d4af37]/25"
              >
                Add Custom Fit to Bag (Rs. {arProduct.price.toLocaleString()})
              </button>

              <button
                onClick={() => setArProduct(null)}
                className="btn-outline w-full py-2.5 text-xs rounded-xl font-medium"
              >
                Close AR Studio
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

