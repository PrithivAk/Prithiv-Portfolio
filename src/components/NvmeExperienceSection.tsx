import React, { useState } from 'react';
import { TypewriterText } from './TypewriterText';
import {
  HardDrive,
  Award,
  Calendar,
  CheckCircle,
  Briefcase,
  Layers,
  Activity
} from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { soundFX } from '../utils/audioSynth';

interface NvmeExperienceSectionProps {
  isOverclocked: boolean;
}

export const NvmeExperienceSection: React.FC<NvmeExperienceSectionProps> = ({ isOverclocked }) => {
  const [activeScan, setActiveScan] = useState<number | null>(null);

  const handleScanDrive = (idx: number) => {
    soundFX.playPulseSound();
    setActiveScan(idx);
    setTimeout(() => {
      setActiveScan(null);
    }, 1500);
  };

  return (
    <section id="sec-nvme" className="relative py-8 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded border ${isOverclocked ? 'border-amber-500 bg-amber-950/40 text-amber-400' : 'border-cyan-500 bg-cyan-950/40 text-cyan-400'}`}>
              <HardDrive className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold font-mono text-slate-100 tracking-tight flex items-center gap-2">
                WORK EXPERIENCE & CERTIFICATIONS
              </h2>
              <p className="text-xs font-mono text-slate-400">
                INTERNSHIP ROLES & INDUSTRY CREDENTIALS
              </p>
            </div>
          </div>

          <div className="text-xs font-mono px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>VERIFIED TIMELINE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Internships Slots (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-cyan-400" />
              <span>INTERNSHIPS & INDUSTRY EXPERIENCE</span>
            </div>

            {resumeData.internships.map((intern, idx) => {
              const isScanning = activeScan === idx;
              return (
                <div
                  key={idx}
                  className={`relative rounded-2xl bg-slate-900/90 border-2 ${
                    isScanning
                      ? 'border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                      : 'border-slate-800 hover:border-cyan-500/50'
                  } backdrop-blur-md p-5 transition-all duration-300 group animate-water-drop`}
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  {/* Decorative Notch */}
                  <div className="absolute top-4 right-4 w-3 h-3 rounded-full border border-slate-700 bg-slate-950 flex items-center justify-center">
                    <span className="w-1 h-1 rounded-full bg-cyan-400" />
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-400 mb-1">
                    <span>ROLE 0{idx + 1}</span>
                    <span>•</span>
                    <span className="text-slate-400">{intern.type === 'ML' ? 'MACHINE LEARNING FOCUS' : 'FULL STACK FOCUS'}</span>
                  </div>

                  <h3 className="text-base font-extrabold font-mono text-slate-100 group-hover:text-cyan-300 transition-colors">
                    <TypewriterText text={intern.role} speed={22} delay={idx * 150} cursorColor="cyan" />
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-300 mt-1 mb-3">
                    <span className="font-bold text-amber-300">
                      <TypewriterText text={intern.company} speed={20} delay={idx * 150 + 200} cursorColor="amber" />
                    </span>
                    <span className="text-slate-600">|</span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <TypewriterText text={intern.period} speed={20} delay={idx * 150 + 350} cursorColor="white" />
                    </span>
                  </div>

                  <div className="space-y-2 text-xs font-mono text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-slate-800/80">
                    {intern.description.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <div>
                          <TypewriterText text={bullet} speed={12} delay={idx * 150 + 400 + bIdx * 200} cursorColor="emerald" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Drive Diagnostic Action */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                    <div className="flex items-center gap-2 text-slate-400">
                      <span>STATUS: COMPLETED</span>
                    </div>

                    <button
                      onClick={() => handleScanDrive(idx)}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                    >
                      {isScanning ? (
                        <>
                          <Activity className="w-3 h-3 animate-spin" />
                          <span>VERIFYING...</span>
                        </>
                      ) : (
                        <span>VERIFY LOGS</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Certifications (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-400" />
              <span>CERTIFICATIONS</span>
            </div>

            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 space-y-3 animate-water-drop" style={{ animationDelay: '200ms' }}>
              {resumeData.certifications.map((cert, cIdx) => (
                <div
                  key={cIdx}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-colors"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1">
                    <span>{cert.code}</span>
                    <span className="text-purple-400 font-bold">VERIFIED</span>
                  </div>

                  <h4 className="text-xs font-extrabold font-mono text-slate-100 mb-1">
                    <TypewriterText text={cert.title} speed={20} delay={cIdx * 150} cursorColor="purple" />
                  </h4>

                  <p className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                    <Layers className="w-3 h-3 text-cyan-400" />
                    <TypewriterText text={cert.provider} speed={20} delay={cIdx * 150 + 200} cursorColor="cyan" />
                  </p>
                </div>
              ))}

              <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/30 text-[11px] font-mono text-purple-300 text-center">
                All credentials verified and official.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
