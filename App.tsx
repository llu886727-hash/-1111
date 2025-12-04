import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './components/Scene';
import { TreeState } from './types';
import { COLORS } from './constants';

const App: React.FC = () => {
  const [treeState, setTreeState] = useState<TreeState>(TreeState.TREE_SHAPE);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [userImages, setUserImages] = useState<string[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleState = () => {
    setTreeState(prev => prev === TreeState.TREE_SHAPE ? TreeState.SCATTERED : TreeState.TREE_SHAPE);
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file as Blob);
      setAudioSrc(url);
      setIsPlaying(true);
      // Auto play when loaded
      setTimeout(() => {
          if (audioRef.current) audioRef.current.play();
      }, 100);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const urls: string[] = [];
      Array.from(e.target.files).forEach(file => {
        urls.push(URL.createObjectURL(file));
      });
      setUserImages(prev => [...prev, ...urls]);
    }
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full h-screen relative bg-black overflow-hidden font-serif">
      {/* Audio Element */}
      <audio ref={audioRef} src={audioSrc || undefined} loop />

      {/* 3D Canvas */}
      <Canvas 
        shadows
        dpr={[1, 2]} 
        gl={{ 
          antialias: false,
          toneMapping: 3, 
          toneMappingExposure: 1.2 
        }}
      >
        <Scene treeState={treeState} userImages={userImages} />
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col justify-between p-6 md:p-12 z-10">
        
        {/* Header */}
        <header className="flex justify-between items-start animate-fade-in-down">
          <div>
            <h1 className="text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-700 font-bold tracking-tighter drop-shadow-2xl filter uppercase font-display">
              TRUMP
            </h1>
            <p className="text-yellow-600/80 text-sm md:text-lg tracking-[0.4em] uppercase mt-0 font-bold border-t border-yellow-800/50 pt-2 inline-block">
              Signature Edition
            </p>
          </div>
          
          {/* Settings Toggle */}
          <button 
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="pointer-events-auto text-yellow-500 hover:text-yellow-200 transition-colors uppercase text-xs tracking-widest border border-yellow-700/50 px-4 py-2 bg-black/50 backdrop-blur-md rounded-sm"
          >
            {settingsOpen ? 'Close Settings' : 'Customize'}
          </button>
        </header>

        {/* Settings Panel */}
        {settingsOpen && (
            <div className="pointer-events-auto absolute top-24 right-6 md:right-12 w-80 bg-black/80 backdrop-blur-xl border border-yellow-600/30 p-6 rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-fade-in-down">
                <h3 className="text-yellow-400 uppercase tracking-widest text-sm mb-6 border-b border-yellow-800/50 pb-2">Customization</h3>
                
                {/* Audio Upload */}
                <div className="mb-6">
                    <label className="block text-yellow-100/60 text-xs uppercase tracking-wider mb-2">Background Music</label>
                    <input 
                        type="file" 
                        accept="audio/*"
                        onChange={handleAudioUpload}
                        className="w-full text-xs text-yellow-500 file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-xs file:font-semibold file:bg-yellow-900/30 file:text-yellow-400 hover:file:bg-yellow-900/50 cursor-pointer"
                    />
                    {audioSrc && (
                        <div className="flex gap-2 mt-2">
                             <button onClick={toggleAudio} className="text-xs uppercase bg-yellow-600 text-black px-3 py-1 font-bold">
                                {isPlaying ? 'Pause' : 'Play'}
                             </button>
                        </div>
                    )}
                </div>

                {/* Image Upload */}
                <div className="mb-4">
                    <label className="block text-yellow-100/60 text-xs uppercase tracking-wider mb-2">Add Photos</label>
                    <input 
                        type="file" 
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="w-full text-xs text-yellow-500 file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-xs file:font-semibold file:bg-yellow-900/30 file:text-yellow-400 hover:file:bg-yellow-900/50 cursor-pointer"
                    />
                    <p className="text-[10px] text-yellow-500/40 mt-1">Supports multiple images. Renders as gold-framed polaroids.</p>
                </div>
            </div>
        )}

        {/* Controls */}
        <div className="pointer-events-auto flex flex-col items-center justify-end pb-8">
          <button
            onClick={toggleState}
            className="group relative px-10 py-5 bg-gradient-to-t from-yellow-900/90 to-black/80 backdrop-blur-md border border-yellow-600 text-yellow-100 font-bold tracking-widest text-sm uppercase transition-all duration-500 hover:border-yellow-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] rounded-sm overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
               {treeState === TreeState.TREE_SHAPE ? 'Disassemble' : 'Build the Tree'}
               <span className={`block w-2 h-2 rounded-full ${treeState === TreeState.TREE_SHAPE ? 'bg-yellow-400 shadow-[0_0_15px_#fbbf24]' : 'bg-red-500 shadow-[0_0_15px_#ff0000]'}`} />
            </span>
            
            {/* Hover shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
          </button>
          
          <p className="mt-6 text-yellow-700/50 text-[10px] tracking-[0.2em] uppercase font-bold">
            Make Christmas Great Again
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;