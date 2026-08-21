import React from 'react';
import {
  Printer,
  Mail,
  Phone,
  Linkedin,
  Github,
  Code,
  Award,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Layers,
  FileCheck
} from 'lucide-react';
import { resumeData } from '../data/resumeData';

export const BlueprintView: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto my-8 px-4 font-sans text-slate-200">
      
      {/* Top Action Bar */}
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-xl mb-6 print:hidden">
        <div>
          <h2 className="text-sm font-mono font-bold text-slate-100">ENGINEERING BLUEPRINT VIEW</h2>
          <p className="text-xs text-slate-400">Clean, printable document format for recruiters & hiring teams.</p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs transition-colors shadow-lg"
        >
          <Printer className="w-4 h-4" />
          <span>PRINT / EXPORT PDF</span>
        </button>
      </div>

      {/* Main Resume Sheet Paper */}
      <div className="bg-slate-950 border-2 border-slate-800 rounded-2xl p-8 md:p-12 shadow-2xl print:bg-white print:text-slate-900 print:border-none print:shadow-none print:p-0">
        
        {/* Header Name & Contact Details */}
        <div className="border-b-2 border-cyan-500/40 pb-6 mb-6 print:border-slate-300">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-100 print:text-slate-900 font-mono uppercase mb-2">
            {resumeData.personalInfo.name}
          </h1>

          <p className="text-sm font-mono text-cyan-400 print:text-cyan-700 font-semibold mb-4">
            {resumeData.personalInfo.specialization}
          </p>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-slate-300 print:text-slate-700">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-cyan-400 print:text-slate-900" />
              <span>{resumeData.personalInfo.email}</span>
            </span>

            <span>•</span>

            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-400 print:text-slate-900" />
              <span>+91 {resumeData.personalInfo.phone}</span>
            </span>

            <span>•</span>

            <a href={resumeData.personalInfo.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
              <Linkedin className="w-3.5 h-3.5 text-blue-400 print:text-slate-900" />
              <span>LinkedIn</span>
            </a>

            <span>•</span>

            <a href={resumeData.personalInfo.links.github} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
              <Github className="w-3.5 h-3.5 text-purple-400 print:text-slate-900" />
              <span>GitHub</span>
            </a>

            <span>•</span>

            <a href={resumeData.personalInfo.links.leetcode} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
              <Code className="w-3.5 h-3.5 text-amber-400 print:text-slate-900" />
              <span>LeetCode</span>
            </a>

            <span>•</span>

            <a href={resumeData.personalInfo.links.hackerrank} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-emerald-400 print:text-slate-900" />
              <span>HackerRank</span>
            </a>
          </div>
        </div>

        {/* Section: Objective */}
        <div className="mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 print:text-cyan-800 border-b border-slate-800 print:border-slate-300 pb-1 mb-3">
            OBJECTIVE
          </h2>
          <p className="text-xs font-mono text-slate-300 print:text-slate-800 leading-relaxed">
            {resumeData.objective}
          </p>
        </div>

        {/* Section: Education */}
        <div className="mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 print:text-cyan-800 border-b border-slate-800 print:border-slate-300 pb-1 mb-3">
            EDUCATION
          </h2>

          <div className="space-y-4">
            {resumeData.education.map((edu, idx) => (
              <div key={idx} className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-xs font-mono font-bold text-slate-100 print:text-slate-900">
                    {edu.degree}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 print:text-slate-700">
                    {edu.institution}
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-cyan-300 print:text-cyan-900">
                  {edu.metric}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Technical Skills */}
        <div className="mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 print:text-cyan-800 border-b border-slate-800 print:border-slate-300 pb-1 mb-3">
            TECHNICAL SKILLS
          </h2>

          <div className="space-y-2 text-xs font-mono text-slate-300 print:text-slate-800">
            <div>
              <strong className="text-slate-100 print:text-slate-900">Programming Languages:</strong> {resumeData.skills.programming.join(', ')}
            </div>
            <div>
              <strong className="text-slate-100 print:text-slate-900">Database:</strong> {resumeData.skills.database.join(', ')}
            </div>
            <div>
              <strong className="text-slate-100 print:text-slate-900">Core Areas:</strong> {resumeData.skills.coreAreas.join(', ')}
            </div>
          </div>
        </div>

        {/* Section: Internship Experience */}
        <div className="mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 print:text-cyan-800 border-b border-slate-800 print:border-slate-300 pb-1 mb-3">
            INTERNSHIP EXPERIENCE
          </h2>

          <div className="space-y-4">
            {resumeData.internships.map((intern, idx) => (
              <div key={idx}>
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                  <h3 className="text-xs font-mono font-bold text-slate-100 print:text-slate-900">
                    {intern.role} <span className="font-normal text-slate-400 print:text-slate-600">— {intern.company}</span>
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400 print:text-slate-600">
                    {intern.period}
                  </span>
                </div>

                <ul className="list-disc list-inside text-xs font-mono text-slate-300 print:text-slate-800 space-y-1 pl-1">
                  {intern.description.map((bullet, bIdx) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Certifications */}
        <div className="mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 print:text-cyan-800 border-b border-slate-800 print:border-slate-300 pb-1 mb-3">
            CERTIFICATIONS
          </h2>

          <ul className="list-disc list-inside text-xs font-mono text-slate-300 print:text-slate-800 space-y-1">
            {resumeData.certifications.map((cert, cIdx) => (
              <li key={cIdx}>
                <strong className="text-slate-100 print:text-slate-900">{cert.title}</strong> – {cert.provider}
              </li>
            ))}
          </ul>
        </div>

        {/* Section: Projects */}
        <div className="mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 print:text-cyan-800 border-b border-slate-800 print:border-slate-300 pb-1 mb-3">
            PROJECTS
          </h2>

          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
              <h3 className="text-xs font-mono font-bold text-slate-100 print:text-slate-900 flex items-center gap-2">
                <span>{resumeData.projects[0].title} — {resumeData.projects[0].subtitle}</span>
                <a
                  href={resumeData.projects[0].githubUrl || resumeData.personalInfo.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] text-cyan-400 hover:underline print:text-cyan-800"
                >
                  <Github className="w-3 h-3" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </h3>
              <span className="text-[11px] font-mono text-cyan-400 print:text-slate-700">
                [{resumeData.projects[0].techStack.join(', ')}]
              </span>
            </div>

            <ul className="list-disc list-inside text-xs font-mono text-slate-300 print:text-slate-800 space-y-1.5 pl-1">
              {resumeData.projects[0].description.map((bullet, idx) => (
                <li key={idx} className="leading-relaxed">{bullet}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Declaration */}
        <div className="pt-6 border-t border-slate-800 print:border-slate-300 text-[11px] font-mono text-slate-400 print:text-slate-600">
          <p>
            <strong>DECLARATION:</strong> {resumeData.declaration}
          </p>
        </div>

      </div>
    </div>
  );
};
