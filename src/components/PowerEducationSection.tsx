import React from 'react';
import { TypewriterText } from './TypewriterText';
import {
  Zap,
  GraduationCap,
  Building2,
  Award,
  CheckCircle2
} from 'lucide-react';
import { resumeData } from '../data/resumeData';

interface PowerEducationSectionProps {
  isOverclocked: boolean;
}

export const PowerEducationSection: React.FC<PowerEducationSectionProps> = ({ isOverclocked }) => {
  return (
    <section id="sec-power" className="relative py-8 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded border ${isOverclocked ? 'border-amber-500 bg-amber-950/40 text-amber-400' : 'border-cyan-500 bg-cyan-950/40 text-cyan-400'}`}>
              <Zap className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold font-mono text-slate-100 tracking-tight flex items-center gap-2">
                ACADEMIC BACKGROUND
              </h2>
              <p className="text-xs font-mono text-slate-400">
                EDUCATION & DEGREES
              </p>
            </div>
          </div>

          <div className="text-xs font-mono px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>VERIFIED DEGREES</span>
          </div>
        </div>

        {/* Education Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resumeData.education.map((edu, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl bg-slate-900/90 border-2 ${
                edu.type === 'college' ? 'border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)]' : 'border-slate-800'
              } backdrop-blur-md p-6 flex flex-col justify-between group transition-all duration-300 hover:border-cyan-400 animate-water-drop`}
              style={{ animationDelay: `${idx * 200}ms` }}
            >
              {/* Cable Accent */}
              <div className="absolute top-0 right-6 w-12 h-2 bg-gradient-to-r from-amber-500 via-cyan-500 to-purple-500 rounded-b-sm opacity-80" />

              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-2">
                  <span className="text-cyan-400 font-bold uppercase">{edu.type === 'college' ? 'COLLEGE DEGREE' : 'SCHOOLING'}</span>
                  <span>STATUS: COMPLETED</span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-cyan-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-extrabold font-mono text-slate-100 group-hover:text-cyan-300 transition-colors">
                    <TypewriterText text={edu.degree} speed={25} delay={idx * 200} cursorColor="cyan" />
                  </h3>
                </div>

                <p className="text-xs font-mono text-slate-300 flex items-center gap-1.5 mb-4">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <TypewriterText text={edu.institution} speed={20} delay={idx * 200 + 200} cursorColor="amber" />
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">ACADEMIC SCORE</span>
                <span className="px-3 py-1 rounded bg-slate-950 border border-cyan-500/40 text-cyan-300 font-mono font-extrabold text-sm flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <TypewriterText text={edu.metric} speed={25} delay={idx * 200 + 400} cursorColor="emerald" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Declaration Block */}
        <div className="mt-8 p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4 animate-water-drop" style={{ animationDelay: '400ms' }}>
          <div className="flex items-start gap-3 max-w-2xl">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-mono font-bold text-slate-200 mb-1">
                OFFICIAL DECLARATION
              </div>
              <div className="text-xs font-mono text-slate-400 italic">
                <TypewriterText text={`"${resumeData.declaration}"`} speed={15} delay={600} cursorColor="cyan" />
              </div>
            </div>
          </div>

          <div className="text-right text-[11px] font-mono text-slate-500 border-l border-slate-800 pl-4 hidden sm:block">
            <div>SIGNED BY: PRITHIV A K</div>
            <div className="text-cyan-400 font-semibold">VERIFIED</div>
          </div>
        </div>

      </div>
    </section>
  );
};
