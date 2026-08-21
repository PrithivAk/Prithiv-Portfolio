import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Zap,
  Volume2,
  VolumeX,
  FileText,
  Terminal,
  Activity,
  Maximize2,
  LayoutGrid,
  Github
} from 'lucide-react';
import { ViewMode } from '../types';
import { resumeData } from '../data/resumeData';
import { soundFX } from '../utils/audioSynth';

interface HeaderNavbarProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  isOverclocked: boolean;
  setIsOverclocked: (val: boolean | ((prev: boolean) => boolean)) => void;
  isDebugMode: boolean;
  setIsDebugMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  onOpenTerminal: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  viewMode,
  setViewMode,
  isOverclocked,
  setIsOverclocked,
  isDebugMode,
  setIsDebugMode,
  onOpenTerminal,
  soundEnabled,
  setSoundEnabled,
}) => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOverclockToggle = () => {
    soundFX.playOverclockChime();
    setIsOverclocked((prev) => !prev);
  };

  const handleAudioToggle = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFX.setEnabled(next);
    if (next) soundFX.playMechanicalClick(1000);
  };

  const scrollToSection = (id: string) => {
    soundFX.playMechanicalClick(600);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-cyan-500/20 px-3 py-2.5 shadow-xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Brand / System Identity */}
        <div className="flex items-center gap-3">
          <div className={`relative p-2 rounded border transition-all duration-300 ${
            isOverclocked
              ? 'bg-amber-950/40 border-amber-500/50 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
              : 'bg-cyan-950/40 border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
          }`}>
            <Cpu className="w-5 h-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isOverclocked ? 'bg-amber-400' : 'bg-cyan-400'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isOverclocked ? 'bg-amber-500' : 'bg-cyan-500'}`}></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold tracking-widest text-slate-100 uppercase">
                PRITHIV A K
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                SYSTEM
              </span>
            </div>
            <p className="text-[10px] font-mono text-cyan-400/80 flex items-center gap-1">
              <span>{isOverclocked ? 'BOOST MODE' : 'STABLE MODE'}</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">{timeStr}</span>
            </p>
          </div>
        </div>

        {/* Navigation Quick Links */}
        {viewMode === 'motherboard' && (
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800 text-xs font-mono">
            <button
              onClick={() => scrollToSection('sec-cpu')}
              className="px-2.5 py-1 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded transition-colors"
            >
              Profile
            </button>
            <button
              onClick={() => scrollToSection('sec-ram')}
              className="px-2.5 py-1 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded transition-colors"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection('sec-pcie')}
              className="px-2.5 py-1 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded transition-colors"
            >
              Zoar AI
            </button>
            <button
              onClick={() => scrollToSection('sec-nvme')}
              className="px-2.5 py-1 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded transition-colors"
            >
              Internships
            </button>
            <button
              onClick={() => scrollToSection('sec-power')}
              className="px-2.5 py-1 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded transition-colors"
            >
              Education
            </button>
            <button
              onClick={() => scrollToSection('sec-io')}
              className="px-2.5 py-1 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded transition-colors"
            >
              Contact
            </button>
          </nav>
        )}

        {/* Hardware Controls & System Toggles */}
        <div className="flex items-center gap-2">

          {/* Overclock Toggle */}
          <button
            onClick={handleOverclockToggle}
            title="Toggle Overclock Mode"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded border text-xs font-mono font-semibold transition-all duration-300 ${
              isOverclocked
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)] animate-pulse'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-amber-500/50 hover:text-amber-400'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${isOverclocked ? 'fill-current' : ''}`} />
            <span className="hidden sm:inline">
              {isOverclocked ? 'TURBO ON' : 'OVERCLOCK'}
            </span>
          </button>

          {/* Debug Matrix Toggle */}
          <button
            onClick={() => {
              soundFX.playMechanicalClick();
              setIsDebugMode((prev) => !prev);
            }}
            title="Toggle Debug Voltage Grid"
            className={`p-1.5 rounded border text-xs font-mono transition-colors ${
              isDebugMode
                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-4 h-4" />
          </button>

          {/* Hardware Terminal CLI Launcher */}
          <button
            onClick={() => {
              soundFX.playRelaySwitch();
              onOpenTerminal();
            }}
            title="Open BIOS Hardware Terminal CLI"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-slate-900 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-950/50 hover:border-cyan-400 text-xs font-mono transition-all shadow-[0_0_10px_rgba(6,182,212,0.15)]"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CLI</span>
          </button>

          {/* GitHub Direct Link Button */}
          <a
            href={resumeData.personalInfo.links.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFX.playPulseSound()}
            title="Open GitHub Profile & Repositories"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-slate-900 border border-purple-500/40 text-purple-300 hover:bg-purple-950/50 hover:border-purple-400 text-xs font-mono transition-all shadow-[0_0_10px_rgba(168,85,247,0.15)]"
          >
            <Github className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden md:inline">GitHub</span>
          </a>

          {/* View Mode Toggle (Motherboard Chassis vs Clean Blueprint) */}
          <button
            onClick={() => {
              soundFX.playMechanicalClick();
              setViewMode(viewMode === 'motherboard' ? 'blueprint' : 'motherboard');
            }}
            title="Switch View Mode"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-xs font-mono transition-colors"
          >
            {viewMode === 'motherboard' ? (
              <>
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Blueprint</span>
              </>
            ) : (
              <>
                <LayoutGrid className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Chassis</span>
              </>
            )}
          </button>

        </div>
      </div>
    </header>
  );
};
