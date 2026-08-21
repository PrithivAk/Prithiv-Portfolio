import React, { useState } from 'react';
import { TypewriterText } from './TypewriterText';
import {
  Database,
  Terminal,
  Activity,
  Cpu,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { soundFX } from '../utils/audioSynth';

interface RamSkillsSectionProps {
  isOverclocked: boolean;
}

export const RamSkillsSection: React.FC<RamSkillsSectionProps> = ({ isOverclocked }) => {
  const [activeSkillTest, setActiveSkillTest] = useState<string | null>(null);
  const [testLog, setTestLog] = useState<string>('CLICK A SKILL TO VERIFY PROFICIENCY & EXPERIENCE');

  const handleTestSkill = (skillName: string) => {
    soundFX.playPulseSound();
    setActiveSkillTest(skillName);
    setTestLog(`VERIFYING [${skillName.toUpperCase()}] ... PROFICIENCY STATUS: EXCELLENT | VERIFIED!`);
    setTimeout(() => {
      setActiveSkillTest(null);
    }, 2000);
  };

  const skillCategories = [
    {
      title: 'PROGRAMMING LANGUAGES',
      code: 'CORE LANGUAGES',
      skills: resumeData.skills.programming,
      color: 'border-cyan-500/50 text-cyan-400 bg-cyan-950/20',
      badgeColor: 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300',
      icon: Terminal
    },
    {
      title: 'DATABASE ENGINES',
      code: 'DATA STORAGE',
      skills: resumeData.skills.database,
      color: 'border-emerald-500/50 text-emerald-400 bg-emerald-950/20',
      badgeColor: 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300',
      icon: Database
    },
    {
      title: 'CORE DOMAINS & ARCHITECTURES',
      code: 'SPECIALIZATION',
      skills: resumeData.skills.coreAreas,
      color: 'border-purple-500/50 text-purple-400 bg-purple-950/20',
      badgeColor: 'bg-purple-500/10 border-purple-500/40 text-purple-300',
      icon: Cpu
    }
  ];

  return (
    <section id="sec-ram" className="relative py-8 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded border ${isOverclocked ? 'border-amber-500 bg-amber-950/40 text-amber-400' : 'border-cyan-500 bg-cyan-950/40 text-cyan-400'}`}>
              <Zap className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold font-mono text-slate-100 tracking-tight flex items-center gap-2">
                TECHNICAL SKILLS & COMPETENCIES
              </h2>
              <p className="text-xs font-mono text-slate-400">
                PROGRAMMING LANGUAGES, DATABASES & AI DOMAINS
              </p>
            </div>
          </div>

          <div className="text-xs font-mono px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>VERIFIED SKILL MATRIX</span>
          </div>
        </div>

        {/* Diagnostic Status Bar */}
        <div className="mb-6 p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-xs font-mono text-cyan-300 flex items-center justify-between gap-2 animate-water-drop">
          <div className="flex items-center gap-2 truncate">
            <Activity className="w-4 h-4 text-cyan-400 shrink-0 animate-spin" />
            <span className="text-slate-400">SKILL CHECK:</span>
            <span className="text-slate-200 font-bold truncate">{testLog}</span>
          </div>
          <span className="text-[10px] text-slate-500 uppercase shrink-0">INTERACTIVE</span>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className={`relative rounded-2xl bg-slate-900/90 border-2 ${cat.color} backdrop-blur-md p-5 flex flex-col justify-between group transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] animate-water-drop`}
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                {/* Gold Contact Finger Pins */}
                <div className="absolute -bottom-1 left-6 right-6 h-1.5 flex justify-between px-2">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <span key={i} className="w-1 h-full bg-amber-400/80 rounded-t-sm" />
                  ))}
                </div>

                <div>
                  {/* Top Heat Shield Bar */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{cat.code}</span>
                    </div>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-950 text-emerald-400 border border-emerald-500/30">
                      ACTIVE
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold font-mono text-slate-100 mb-3 tracking-wide">
                    <TypewriterText text={cat.title} speed={25} delay={idx * 150} cursorColor="cyan" />
                  </h3>

                  {/* Skills Pills */}
                  <div className="space-y-2.5">
                    {cat.skills.map((skill, sIdx) => {
                      const isTesting = activeSkillTest === skill;
                      return (
                        <div
                          key={sIdx}
                          onClick={() => handleTestSkill(skill)}
                          className={`p-2.5 rounded-xl border ${cat.badgeColor} cursor-pointer hover:border-cyan-400 transition-all flex items-center justify-between group/item ${
                            isTesting ? 'bg-cyan-500/30 border-cyan-400 scale-[1.02]' : ''
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className={`w-3.5 h-3.5 ${isTesting ? 'text-amber-400 animate-bounce' : 'text-cyan-400'}`} />
                            <span className="text-xs font-mono font-bold text-slate-100">
                              <TypewriterText text={skill} speed={20} delay={idx * 150 + sIdx * 80} cursorColor="emerald" />
                            </span>
                          </div>

                          <span className="text-[10px] font-mono text-slate-400 group-hover/item:text-cyan-300">
                            {isTesting ? 'VERIFYING...' : 'CHECK'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Stick Base Metrics */}
                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>LEVEL: HIGH PROFICIENCY</span>
                  <span className="text-cyan-400 font-semibold">READY</span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
