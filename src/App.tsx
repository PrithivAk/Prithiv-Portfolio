import React, { useState } from 'react';
import { ViewMode } from './types';
import { CircuitCanvas } from './components/CircuitCanvas';
import { HeaderNavbar } from './components/HeaderNavbar';
import { CpuHeroSection } from './components/CpuHeroSection';
import { RamSkillsSection } from './components/RamSkillsSection';
import { PcieProjectsSection } from './components/PcieProjectsSection';
import { NvmeExperienceSection } from './components/NvmeExperienceSection';
import { PowerEducationSection } from './components/PowerEducationSection';
import { RearIoContactSection } from './components/RearIoContactSection';
import { HardwareTerminal } from './components/HardwareTerminal';
import { BlueprintView } from './components/BlueprintView';
import { GlowingBlueCursor } from './components/GlowingBlueCursor';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('motherboard');
  const [isOverclocked, setIsOverclocked] = useState<boolean>(false);
  const [isDebugMode, setIsDebugMode] = useState<boolean>(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const handleJumpToZoar = () => {
    const el = document.getElementById('sec-pcie');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-slate-100 font-sans selection:bg-[#00F0FF] selection:text-slate-950 relative overflow-x-hidden circuit-bg">
      <GlowingBlueCursor />
      
      {/* Interactive Circuit Canvas Background */}
      {viewMode === 'motherboard' && (
        <CircuitCanvas isOverclocked={isOverclocked} isDebugMode={isDebugMode} />
      )}

      {/* Motherboard BIOS System Control Navbar */}
      <HeaderNavbar
        viewMode={viewMode}
        setViewMode={setViewMode}
        isOverclocked={isOverclocked}
        setIsOverclocked={setIsOverclocked}
        isDebugMode={isDebugMode}
        setIsDebugMode={setIsDebugMode}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main Motherboard Chassis Layout or Blueprint View */}
      <main className="relative z-10">
        {viewMode === 'motherboard' ? (
          <div className="space-y-4">
            <CpuHeroSection
              isOverclocked={isOverclocked}
              onOpenTerminal={() => setIsTerminalOpen(true)}
              onJumpToZoar={handleJumpToZoar}
            />
            <RamSkillsSection isOverclocked={isOverclocked} />
            <PcieProjectsSection isOverclocked={isOverclocked} />
            <NvmeExperienceSection isOverclocked={isOverclocked} />
            <PowerEducationSection isOverclocked={isOverclocked} />
            <RearIoContactSection isOverclocked={isOverclocked} />
          </div>
        ) : (
          <BlueprintView />
        )}
      </main>

      {/* Hardware Terminal CLI Modal Drawer */}
      <HardwareTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        isOverclocked={isOverclocked}
        setIsOverclocked={setIsOverclocked}
      />

      {/* Footer System Status Bar */}
      <footer className="relative z-10 border-t border-slate-800 bg-slate-950/90 py-4 px-4 text-center font-mono text-xs text-slate-500">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div>
            PRITHIV A K • MOTHERBOARD SYSTEM ARCHITECTURE v4.2
          </div>
          <div className="text-[11px] text-slate-400 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>SYSTEM VOLTAGE: 1.25V STABLE</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
