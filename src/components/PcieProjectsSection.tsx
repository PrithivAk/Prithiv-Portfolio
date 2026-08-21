import React, { useState } from 'react';
import { TypewriterText } from './TypewriterText';
import {
  Layers,
  Cpu,
  Search,
  MessageSquare,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Database,
  Brain,
  Activity,
  Bot,
  Github,
  Code2
} from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { soundFX } from '../utils/audioSynth';

interface PcieProjectsSectionProps {
  isOverclocked: boolean;
}

export const PcieProjectsSection: React.FC<PcieProjectsSectionProps> = ({ isOverclocked }) => {
  const project = resumeData.projects[0];

  const [selectedAgentIdx, setSelectedAgentIdx] = useState<number>(0);
  const [customQuery, setCustomQuery] = useState<string>('');
  const [activeSimulation, setActiveSimulation] = useState<{
    query: string;
    agentName: string;
    agentType: string;
    intentConfidence: number;
    faissScore?: string;
    memoryState: string;
    response: string;
  } | null>(null);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const activeAgent = project.agents[selectedAgentIdx];

  const handleRunSimulation = (queryText: string) => {
    if (!queryText.trim()) return;
    soundFX.playRelaySwitch();
    setIsSimulating(true);

    setTimeout(() => {
      soundFX.playPulseSound();
      setIsSimulating(false);

      let resp = '';
      if (selectedAgentIdx === 0) {
        resp = `[WELLNESS_AGENT]: Analyzing daily recovery protocol. Recommended 10-min diaphragmatic breathing loop + hydration target 2.5L. Stress vector reduced by 28%.`;
      } else if (selectedAgentIdx === 1) {
        resp = `[FAISS_SEARCH_AGENT]: Query vector matched top 3 embeddings in catalog (cosine similarity = 0.942). 1) Ergonomic Split Mechanical Keyboard 2) Active Noise Canceling Headset.`;
      } else {
        resp = `[MOCK_INTERVIEW_AGENT]: Question: "Explain how FAISS handles vector indexing for high-dimensional search." Sample Answer: FAISS builds inverted file indices (IVF) and product quantization (PQ) to compress high-dim vectors...`;
      }

      setActiveSimulation({
        query: queryText,
        agentName: activeAgent.name,
        agentType: activeAgent.type,
        intentConfidence: Math.floor(Math.random() * 5) + 95,
        faissScore: selectedAgentIdx === 1 ? '0.942 (Exact Vector Match)' : undefined,
        memoryState: `SQLite session_id=${Math.floor(Math.random() * 90000 + 10000)} [COMMITTED]`,
        response: resp
      });
    }, 800);
  };

  return (
    <section id="sec-pcie" className="relative py-8 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded border ${isOverclocked ? 'border-amber-500 bg-amber-950/40 text-amber-400' : 'border-cyan-500 bg-cyan-950/40 text-cyan-400'}`}>
              <Layers className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold font-mono text-slate-100 tracking-tight flex items-center gap-2">
                PROJECT HIGHLIGHTS & PLATFORM
              </h2>
              <p className="text-xs font-mono text-slate-400">
                CORE INNOVATION & AI ENGINE PROJECTS
              </p>
            </div>
          </div>

          <div className="text-xs font-mono px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>FEATURED WORK</span>
          </div>
        </div>

        {/* Project Card Chassis */}
        <div className={`relative rounded-2xl bg-slate-900/90 border-2 ${
          isOverclocked ? 'border-amber-500/60 shadow-[0_0_25px_rgba(245,158,11,0.2)]' : 'border-cyan-500/50 shadow-[0_0_25px_rgba(6,182,212,0.15)]'
        } backdrop-blur-xl p-6 md:p-8 overflow-hidden animate-water-drop`}>

          {/* Decorative Connector Teeth Bar */}
          <div className="absolute top-0 left-12 right-12 h-1 flex justify-between px-2">
            {Array.from({ length: 32 }).map((_, i) => (
              <span key={i} className="w-1 h-full bg-amber-400/90" />
            ))}
          </div>

          {/* Project Title & Badge Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/40 text-amber-300 font-mono text-[10px] font-bold">
                  FLAGSHIP PROJECT
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                  STREAMLIT COMMUNITY CLOUD LIVE
                </span>
              </div>
              <h3 className="text-2xl font-extrabold font-mono text-slate-100 flex items-center gap-2">
                <span><TypewriterText text={project.title} speed={25} cursorColor="amber" /></span>
                <span className="text-slate-500 font-normal">—</span>
                <span className="text-cyan-400 font-bold"><TypewriterText text={project.subtitle} speed={25} delay={300} cursorColor="cyan" /></span>
              </h3>
            </div>

            {/* Tech Stack Chips & GitHub Direct Connect Button */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-slate-950 border border-slate-700 text-slate-200 text-xs font-mono"
                  >
                    <TypewriterText text={tech} speed={20} delay={400 + idx * 80} cursorColor="white" />
                  </span>
                ))}
              </div>

              {/* High-Visibility Open in GitHub Button */}
              <a
                href={project.githubUrl || resumeData.personalInfo.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFX.playPulseSound()}
                className="flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border-2 border-cyan-500/60 hover:border-cyan-400 text-slate-100 text-xs font-mono font-bold shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all group"
                title="Open Project Repository on GitHub"
              >
                <Github className="w-4 h-4 text-cyan-400 group-hover:text-amber-400 transition-colors" />
                <span className="text-cyan-300 group-hover:text-white">OPEN IN GITHUB</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Project Overview Bullets */}
          <div className="space-y-3 mb-8">
            {project.description.map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-xs font-mono text-slate-300 leading-relaxed">
                  <TypewriterText text={bullet} speed={12} delay={600 + idx * 250} cursorColor="cyan" />
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Multi-Agent AI Simulator Box */}
          <div className="rounded-xl bg-slate-950 border border-slate-800 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wide">
                  ZOAR MULTI-AGENT ROUTING SIMULATOR
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                LLM Intent Classifier + FAISS Vector Engine
              </span>
            </div>

            {/* Select Agent Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
              {project.agents.map((ag, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    soundFX.playMechanicalClick();
                    setSelectedAgentIdx(idx);
                    setActiveSimulation(null);
                  }}
                  className={`p-2.5 rounded-lg border text-left font-mono transition-all ${
                    selectedAgentIdx === idx
                      ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-[10px] text-slate-500 uppercase">{ag.type}</div>
                  <div className="text-xs font-bold text-slate-100 truncate mt-0.5">{ag.name}</div>
                </button>
              ))}
            </div>

            {/* Selected Agent Details & Sample Queries */}
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800/80 mb-4 text-xs font-mono">
              <div className="text-slate-400 mb-2 flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5 text-cyan-400" />
                <span>Agent Capability: <strong className="text-slate-200">{activeAgent.role}</strong></span>
              </div>

              <div className="text-[11px] text-slate-400 mb-1">Click a sample query to test routing:</div>
              <div className="flex flex-wrap gap-2">
                {activeAgent.sampleQueries.map((sq, sqIdx) => (
                  <button
                    key={sqIdx}
                    onClick={() => {
                      setCustomQuery(sq);
                      handleRunSimulation(sq);
                    }}
                    className="px-2.5 py-1 rounded bg-slate-950 hover:bg-slate-800 border border-slate-700 text-cyan-300 text-[11px] font-mono text-left transition-colors flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>"{sq}"</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input Field */}
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                placeholder="Type a custom query to test Zoar's intent classifier..."
                className="flex-1 bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-lg px-3 py-2 text-xs font-mono text-slate-100 outline-none transition-colors"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleRunSimulation(customQuery);
                }}
              />
              <button
                onClick={() => handleRunSimulation(customQuery || activeAgent.sampleQueries[0])}
                disabled={isSimulating}
                className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs transition-colors flex items-center gap-1.5 shrink-0"
              >
                {isSimulating ? (
                  <>
                    <Activity className="w-3.5 h-3.5 animate-spin" />
                    <span>CLASSIFYING...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-3.5 h-3.5" />
                    <span>ROUTE QUERY</span>
                  </>
                )}
              </button>
            </div>

            {/* Simulation Results Terminal Box */}
            {activeSimulation && (
              <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/40 text-xs font-mono space-y-2 animate-fadeIn">
                <div className="flex items-center justify-between text-emerald-400 border-b border-slate-800 pb-2">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Activity className="w-3.5 h-3.5" />
                    <span>ROUTING RESULT: {activeSimulation.agentName}</span>
                  </span>
                  <span>CONFIDENCE: {activeSimulation.intentConfidence}%</span>
                </div>

                <div className="text-slate-300">
                  <strong className="text-slate-400">QUERY:</strong> "{activeSimulation.query}"
                </div>

                {activeSimulation.faissScore && (
                  <div className="text-cyan-300">
                    <strong className="text-slate-400">FAISS VECTOR SIMILARITY:</strong> {activeSimulation.faissScore}
                  </div>
                )}

                <div className="text-slate-400 text-[11px]">
                  <strong>SHARED MEMORY LAYER:</strong> {activeSimulation.memoryState}
                </div>

                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-slate-200 mt-2">
                  {activeSimulation.response}
                </div>
              </div>
            )}

            {/* Repository Quick Action Dock */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-400">
                <Github className="w-4 h-4 text-slate-300" />
                <span>REPOSITORY: <strong className="text-slate-200">github.com/PrithivAk</strong></span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={project.githubUrl || resumeData.personalInfo.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFX.playMechanicalClick()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>View Project on GitHub</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>

                <a
                  href={resumeData.personalInfo.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFX.playMechanicalClick()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-slate-100 transition-colors"
                >
                  <Code2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>All Repositories</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
