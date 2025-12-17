import React, { useState, useRef } from 'react';
import { 
  SquaresFour, Lightning, Cube, User, Image as ImageIcon, CaretDown, 
  Sparkle, Robot, Copy, Download, ArrowsClockwise, FilmStrip, 
  AirplaneTilt, HandWaving, Hamburger, UserCircle 
} from "@phosphor-icons/react";

function App() {
  // --- STATE ---
  const [selectedStyle, setSelectedStyle] = useState("Presenter Story");
  const [preview, setPreview] = useState(null);
  const [modelPreview, setModelPreview] = useState(null); // State baru untuk Foto Model
  const [bgPreview, setBgPreview] = useState(null);       // State baru untuk Background
  const [loading, setLoading] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [description, setDescription] = useState("");
  const [tone, setTone] = useState("Jelas & To-The-Point");
  const [outputContent, setOutputContent] = useState("");

  const outputRef = useRef(null);

  // --- DATA ---
  const styleOptions = [
    { id: "Presenter Story", label: "Presenter Story", icon: UserCircle },
    { id: "Treadmill Loop", label: "Treadmill Loop", icon: ArrowsClockwise },
    { id: "Fashion B-Roll", label: "Fashion B-Roll", icon: FilmStrip },
    { id: "Travel Vlog", label: "Travel Vlog", icon: AirplaneTilt },
    { id: "Aesthetic Hands", label: "Aesthetic Hands", icon: HandWaving },
    { id: "Food Promo", label: "Food Promo", icon: Hamburger },
  ];

  // --- LOGIC ---
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (type === 'anchor') setPreview(e.target.result);
        if (type === 'model') setModelPreview(e.target.result);
        if (type === 'bg') setBgPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateCampaign = () => {
    if (!description.trim()) {
      alert("Mohon isi deskripsi produk terlebih dahulu!");
      return;
    }

    setLoading(true);
    setShowOutput(false);

    setTimeout(() => {
      const firstWord = description.split(',')[0] || "Produk";
      const result = `// Hook (0-3s)
[Visual: Close up produk / Ekspresi antusias]
"Lagi nyari ${firstWord} yang bener-bener worth it? Jangan di-skip!"

// Content (3-15s) - Tone: ${tone}
[Visual: Detail produk & Fitur utama]
"Bayangin punya produk yang ${description.substring(0, 50)}... 
Gaya ${selectedStyle} ini bakal bikin audiens kamu betah nonton."

// Call To Action (15s+)
[Visual: Klik keranjang kuning]
"Klik keranjang kuning sekarang sebelum promo berakhir!"`;

      setOutputContent(result);
      setLoading(false);
      setShowOutput(true);
      
      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }, 2000);
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col font-sans antialiased selection:bg-blue-100">
      
      {/* HEADER */}
      <header className="w-full border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SquaresFour size={28} weight="fill" />
            <span className="font-bold text-lg tracking-tight">PLOW AFFILIATE</span>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
            <Lightning size={16} weight="fill" className="text-blue-500" />
            <span className="text-xs font-medium text-gray-600">Powered by Gemini AI</span>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        
        {/* HERO */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Buat Konten Campaign.<br className="hidden md:block"/> 
            <span className="text-brand-blue relative inline-block">Satu Klik.
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light">
            Otomasi naskah jualan Anda dengan teknologi AI tercanggih.
          </p>
        </div>

        {/* DASHBOARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* UPLOAD SECTION (LEFT) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="group relative w-full h-64 rounded-2xl upload-dashed flex flex-col items-center justify-center cursor-pointer bg-gray-50/50 overflow-hidden transition-all">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-contain" />
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 border border-gray-100 group-hover:scale-110 transition-transform">
                    <Cube size={28} className="text-gray-700" />
                  </div>
                  <span className="font-semibold">Product Anchor</span>
                  <span className="text-sm text-gray-400 mt-1">Klik untuk upload gambar</span>
                </div>
              )}
              <input type="file" onChange={(e) => handleFileChange(e, 'anchor')} className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* FOTO MODEL UPLOAD */}
              <div className="group relative w-full h-32 rounded-2xl upload-dashed flex flex-col items-center justify-center cursor-pointer bg-gray-50/50 overflow-hidden">
                {modelPreview ? (
                   <img src={modelPreview} alt="Model Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <User size={20} className="text-gray-400 mb-2" />
                    <span className="text-xs font-medium text-gray-500">Foto Model</span>
                  </>
                )}
                <input type="file" onChange={(e) => handleFileChange(e, 'model')} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>

              {/* BACKGROUND UPLOAD */}
              <div className="group relative w-full h-32 rounded-2xl upload-dashed flex flex-col items-center justify-center cursor-pointer bg-gray-50/50 overflow-hidden">
                {bgPreview ? (
                   <img src={bgPreview} alt="Background Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <ImageIcon size={20} className="text-gray-400 mb-2" />
                    <span className="text-xs font-medium text-gray-500">Background</span>
                  </>
                )}
                <input type="file" onChange={(e) => handleFileChange(e, 'bg')} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
            </div>
          </div>

          {/* FORM SECTION (RIGHT) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-card p-6 md:p-8 h-full relative overflow-hidden">
              <div className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Bahasa</label>
                    <select className="w-full bg-gray-50 border border-gray-200 text-sm rounded-xl p-3 outline-none">
                      <option>Bahasa Indonesia</option>
                      <option>English</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Gaya Naskah</label>
                    <select 
                      value={tone} 
                      onChange={(e) => setTone(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 text-sm rounded-xl p-3 outline-none"
                    >
                      <option>Jelas & To-The-Point</option>
                      <option>Storytelling Emosional</option>
                      <option>Hard Selling / FOMO</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Deskripsi Produk</label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    rows="5"
                    placeholder="Masukkan detail produk di sini..."
                  />
                </div>

                <div className="pt-4">
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-3 block">Pilih Alur Cerita:</label>
                  <div className="flex flex-wrap gap-2">
                    {styleOptions.map((option) => (
                      <button 
                        key={option.id}
                        onClick={() => setSelectedStyle(option.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all border ${
                          selectedStyle === option.id 
                          ? 'bg-gray-900 text-white border-gray-900 shadow-md' 
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <option.icon size={16} weight={selectedStyle === option.id ? "fill" : "regular"} />
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA BUTTON */}
        <div className="flex justify-center mb-12">
          <button 
            onClick={generateCampaign}
            disabled={loading}
            className="group px-10 py-4 bg-gray-900 text-white rounded-full font-bold flex items-center gap-2 hover:bg-black hover:scale-105 transition-all shadow-xl disabled:opacity-70 disabled:cursor-wait"
          >
            {loading ? (
              <div className="w-24 h-6 flex items-center justify-center"><div className="dot-pulse"></div></div>
            ) : (
              <>
                <Sparkle size={20} weight="fill" className="text-yellow-400" />
                <span>Generate Campaign</span>
              </>
            )}
          </button>
        </div>

        {/* OUTPUT */}
        {showOutput && (
          <div ref={outputRef} className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl overflow-hidden mb-20">
              <div className="bg-gray-50 p-4 border-b flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="p-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                    <Robot size={22} weight="fill" className="text-blue-600" />
                  </div>
                  <div className="w-full space-y-4">
                    <h3 className="text-lg font-bold">Hasil Naskah: {selectedStyle}</h3>
                    <div className="bg-gray-50 p-6 rounded-xl border font-mono text-sm leading-relaxed whitespace-pre-wrap">
                      {outputContent}
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => { navigator.clipboard.writeText(outputContent); alert('Disalin!'); }} className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50">
                        <Copy size={18} /> Copy Script
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                        <Download size={18} /> Export
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;