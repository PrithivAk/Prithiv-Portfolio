import React, { useState } from 'react';
import { TypewriterText } from './TypewriterText';
import {
  Cpu,
  Mail,
  Phone,
  Linkedin,
  Code,
  Github,
  Award,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  Terminal,
  Layers,
  Activity,
  Zap
} from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { soundFX } from '../utils/audioSynth';

interface CpuHeroSectionProps {
  isOverclocked: boolean;
  onOpenTerminal: () => void;
  onJumpToZoar: () => void;
}

export const CpuHeroSection: React.FC<CpuHeroSectionProps> = ({
  isOverclocked,
  onOpenTerminal,
  onJumpToZoar,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    soundFX.playMechanicalClick();
    navigator.clipboard.writeText(resumeData.personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const primaryAccent = isOverclocked ? 'border-amber-500/60 shadow-[0_0_30px_rgba(245,158,11,0.2)]' : 'border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.15)]';
  const glowText = isOverclocked ? 'text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]';

  return (
    <section id="sec-cpu" className="relative pt-6 pb-12 px-4">
      <div className={`relative max-w-5xl mx-auto bg-slate-900/90 rounded-2xl border ${primaryAccent} backdrop-blur-xl p-6 md:p-8 overflow-hidden transition-all duration-500 animate-water-drop`}>
        
        {/* Background Circuit Grid Texture Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-25 pointer-events-none" />

        {/* Decorative Corner Indicators */}
        <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-600">PROFILE MATRIX</div>
        <div className="absolute top-2 right-2 text-[10px] font-mono text-slate-600">ACTIVE</div>
        <div className="absolute bottom-2 left-2 text-[10px] font-mono text-slate-600">V.S.B. COLLEGE CAMPUS</div>
        <div className="absolute bottom-2 right-2 text-[10px] font-mono text-slate-600">ONLINE</div>

        {/* Top Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-700 text-xs font-mono text-slate-300 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>PROFILE OVERVIEW</span>
            </span>
            <span className="px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-500/40 text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <Activity className="w-3 h-3 animate-pulse" />
              <span>STATUS: AVAILABLE</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>CGPA: <strong className="text-cyan-300 font-bold">{resumeData.personalInfo.cgpa}</strong></span>
            <span>•</span>
            <span>HSC: <strong className="text-slate-200">{resumeData.personalInfo.hscPercentage}</strong></span>
          </div>
        </div>

        {/* Core Layout: Profile Spec & Info */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="inline-block px-2.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono text-xs">
                ENGINEERING PROFILE
              </div>
              <p className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <TypewriterText text="Specialized in AI, ML & Full Stack Development" speed={20} cursorColor="amber" />
              </p>
            </div>

            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight ${glowText} font-display mb-3 py-1 drop-shadow-[0_0_25px_rgba(6,182,212,0.35)]`}>
              <TypewriterText text={resumeData.personalInfo.name} speed={30} cursorColor={isOverclocked ? 'amber' : 'cyan'} />
            </h1>

            <p className="text-base sm:text-lg font-mono text-slate-300 font-semibold mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block animate-pulse"></span>
              <TypewriterText text={resumeData.personalInfo.specialization} speed={25} delay={400} cursorColor="cyan" />
            </p>

            {/* Objective Panel */}
            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed relative animate-water-drop" style={{ animationDelay: '200ms' }}>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 border-b border-slate-800/80 pb-1 flex justify-between">
                <span>CAREER OBJECTIVE</span>
                <span>SUMMARY</span>
              </div>
              <div className="text-slate-300 pt-1">
                <TypewriterText text={`"${resumeData.objective}"`} speed={12} delay={600} cursorColor="emerald" />
              </div>
            </div>
          </div>

          {/* Quick Action Matrix & Social Port Links */}
          <div className="mt-6 space-y-3 animate-water-drop" style={{ animationDelay: '400ms' }}>
              
              {/* Communication Links Bar */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-200 transition-colors"
                  title="Copy Email Address"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{resumeData.personalInfo.email}</span>
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400 ml-1" /> : <Copy className="w-3 h-3 text-slate-400 ml-1" />}
                </button>

                <button
                  onClick={() => {
                    soundFX.playRelaySwitch();
                    onOpenTerminal();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 text-xs font-mono text-cyan-300 transition-colors"
                >
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Launch CLI</span>
                </button>

                <button
                  onClick={() => {
                    soundFX.playPulseSound();
                    onJumpToZoar();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-900/60 border border-amber-500/40 text-xs font-mono text-amber-300 transition-colors"
                >
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>Zoar AI Playground</span>
                </button>
              </div>

              {/* Developer Network Port Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a
                  href={resumeData.personalInfo.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-950 hover:bg-slate-800 border border-slate-700 text-[11px] font-mono text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>

                <a
                  href={resumeData.personalInfo.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-950 hover:bg-slate-800 border border-slate-700 text-[11px] font-mono text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-purple-400" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>

                <a
                  href={resumeData.personalInfo.links.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-950 hover:bg-slate-800 border border-slate-700 text-[11px] font-mono text-slate-300 hover:text-amber-400 transition-colors"
                >
                  <Code className="w-3.5 h-3.5 text-amber-400" />
                  <span>LeetCode</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>

                <a
                  href={resumeData.personalInfo.links.hackerrank}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-950 hover:bg-slate-800 border border-slate-700 text-[11px] font-mono text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  <span>HackerRank</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </div>

            </div>
        </div>

      </div>
    </section>
  );
};

