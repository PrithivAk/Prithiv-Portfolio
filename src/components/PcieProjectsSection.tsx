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
  Code2,
  Play,
  Globe,
  RefreshCw,
  Maximize2,
  Minimize2,
  Monitor,
  Tablet,
  Smartphone,
  ShieldCheck,
  Zap,
  X
} from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { soundFX } from '../utils/audioSynth';

interface PcieProjectsSectionProps {
  isOverclocked: boolean;
}

export const PcieProjectsSection: React.FC<PcieProjectsSectionProps> = ({ isOverclocked }) => {
  const project = resumeData.projects[0];
  const liveUrl = project.liveDemoUrl || 'https://zoar-ai.vercel.app/';

  // Tab State: 'live_app' | 'simulator' | 'tech_specs'
  const [activeTab, setActiveTab] = useState<'live_app' | 'simulator' | 'tech_specs'>('live_app');
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

  // Live Embedded App Runner State
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [isIframeLoading, setIsIframeLoading] = useState<boolean>(true);
  const [deviceViewport, setDeviceViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isFullscreenModal, setIsFullscreenModal] = useState<boolean>(false);

  const activeAgent = project.agents[selectedAgentIdx];

  const handleReloadIframe = () => {
    soundFX.playRelaySwitch();
    setIsIframeLoading(true);
    setIframeKey((prev) => prev + 1);
  };

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
                CORE INNOVATION & LIVE RUNNER CLUSTER
              </p>
            </div>
          </div>

          {/* Quick Status Pill */}
          <div className="text-xs font-mono px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>LIVE AT ZOAR-AI.VERCEL.APP</span>
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

          {/* Project Title & Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/40 text-amber-300 font-mono text-[10px] font-bold">
                  FLAGSHIP PROJECT
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono text-[10px] flex items-center gap-1">
                  <Globe className="w-3 h-3 text-emerald-400" />
                  <span>VERCEL PRODUCTION DEPLOYMENT</span>
                </span>
              </div>
              <h3 className="text-2xl font-extrabold font-mono text-slate-100 flex items-center gap-2">
                <span><TypewriterText text={project.title} speed={25} cursorColor="amber" /></span>
                <span className="text-slate-500 font-normal">—</span>
                <span className="text-cyan-400 font-bold"><TypewriterText text={project.subtitle} speed={25} delay={300} cursorColor="cyan" /></span>
              </h3>
            </div>

            {/* Launch & Action Hub */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Run Sample / Open Live App */}
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFX.playPulseSound()}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-slate-950 text-xs font-mono font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.7)] transition-all group"
                title="Launch Zoar AI in New Tab (https://zoar-ai.vercel.app/)"
              >
                <Play className="w-4 h-4 fill-slate-950 text-slate-950 group-hover:scale-110 transition-transform" />
                <span>LAUNCH ZOAR LIVE</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-950/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* GitHub Button */}
              <a
                href={project.githubUrl || resumeData.personalInfo.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFX.playMechanicalClick()}
                className="flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-200 text-xs font-mono font-bold transition-all"
                title="Open Project Repository on GitHub"
              >
                <Github className="w-4 h-4 text-purple-400" />
                <span>GitHub Repo</span>
              </a>
            </div>
          </div>

          {/* Tech Stack Chips Bar */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs font-mono text-slate-500 uppercase mr-1">TECH STACK:</span>
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded bg-slate-950 border border-slate-700 text-slate-200 text-xs font-mono"
              >
                <TypewriterText text={tech} speed={20} delay={400 + idx * 80} cursorColor="white" />
              </span>
            ))}
          </div>

          {/* Project Overview Bullets */}
          <div className="space-y-2.5 mb-6">
            {project.description.map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-xs font-mono text-slate-300 leading-relaxed">
                  <TypewriterText text={bullet} speed={10} delay={500 + idx * 200} cursorColor="cyan" />
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Workspace Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  soundFX.playMechanicalClick();
                  setActiveTab('live_app');
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
                  activeTab === 'live_app'
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.35)]'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>RUN LIVE APP SAMPLE</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
              </button>

              <button
                onClick={() => {
                  soundFX.playMechanicalClick();
                  setActiveTab('simulator');
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
                  activeTab === 'simulator'
                    ? 'bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.35)]'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <Bot className="w-4 h-4" />
                <span>ROUTING SIMULATOR</span>
              </button>

              <button
                onClick={() => {
                  soundFX.playMechanicalClick();
                  setActiveTab('tech_specs');
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
                  activeTab === 'tech_specs'
                    ? 'bg-purple-500 text-slate-950 shadow-[0_0_15px_rgba(168,85,247,0.35)]'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <Brain className="w-4 h-4" />
                <span>SYSTEM ARCHITECTURE</span>
              </button>
            </div>

            <div className="text-[11px] font-mono text-slate-400 hidden sm:flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>SSL SECURED • VERCEL EDGE</span>
            </div>
          </div>

          {/* TAB 1: EMBEDDED LIVE APP RUNNER */}
          {activeTab === 'live_app' && (
            <div className="rounded-xl bg-slate-950 border border-cyan-500/40 p-4 animate-fadeIn shadow-[0_0_25px_rgba(6,182,212,0.1)]">
              
              {/* Browser Deck Frame Top Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 rounded-lg bg-slate-900 border border-slate-800 mb-3">
                
                {/* Simulated Traffic Lights & URL Bar */}
                <div className="flex items-center gap-3 flex-1 min-w-[280px]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>

                  <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-slate-500">https://</span>
                    <strong className="text-cyan-300">zoar-ai.vercel.app</strong>
                    <span className="text-emerald-400 text-[10px] ml-auto font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      ONLINE
                    </span>
                  </div>
                </div>

                {/* Viewport Width Controls & Window Actions */}
                <div className="flex items-center gap-1.5">
                  {/* Viewport switches */}
                  <div className="hidden md:flex items-center bg-slate-950 p-0.5 rounded border border-slate-800 mr-2">
                    <button
                      onClick={() => {
                        soundFX.playMechanicalClick();
                        setDeviceViewport('desktop');
                      }}
                      className={`p-1.5 rounded text-xs transition-colors ${
                        deviceViewport === 'desktop' ? 'bg-cyan-950 text-cyan-300' : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title="Desktop View (100%)"
                    >
                      <Monitor className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        soundFX.playMechanicalClick();
                        setDeviceViewport('tablet');
                      }}
                      className={`p-1.5 rounded text-xs transition-colors ${
                        deviceViewport === 'tablet' ? 'bg-cyan-950 text-cyan-300' : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title="Tablet View (768px)"
                    >
                      <Tablet className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        soundFX.playMechanicalClick();
                        setDeviceViewport('mobile');
                      }}
                      className={`p-1.5 rounded text-xs transition-colors ${
                        deviceViewport === 'mobile' ? 'bg-cyan-950 text-cyan-300' : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title="Mobile View (420px)"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Reload Session Button */}
                  <button
                    onClick={handleReloadIframe}
                    className="p-1.5 rounded bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono transition-colors flex items-center gap-1"
                    title="Reload Embedded Session"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isIframeLoading ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline text-[11px]">Reload</span>
                  </button>

                  {/* Fullscreen Modal View */}
                  <button
                    onClick={() => {
                      soundFX.playPulseSound();
                      setIsFullscreenModal(true);
                    }}
                    className="p-1.5 rounded bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono transition-colors flex items-center gap-1"
                    title="Expand to Fullscreen View"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden sm:inline text-[11px]">Expand</span>
                  </button>

                  {/* Open Direct Tab */}
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFX.playPulseSound()}
                    className="p-1.5 rounded bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 text-xs font-mono transition-colors flex items-center gap-1"
                    title="Open in New Tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="hidden sm:inline text-[11px]">New Tab</span>
                  </a>
                </div>

              </div>

              {/* Embedded Live Iframe Display Deck */}
              <div className="relative rounded-lg overflow-hidden bg-slate-900 border border-slate-800 flex justify-center min-h-[580px]">
                
                {/* Loading State Overlay */}
                {isIframeLoading && (
                  <div className="absolute inset-0 z-10 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
                    <Activity className="w-8 h-8 text-cyan-400 animate-spin mb-3" />
                    <div className="text-sm font-mono font-bold text-slate-100 mb-1">
                      CONNECTING TO ZOAR-AI.VERCEL.APP...
                    </div>
                    <p className="text-xs font-mono text-slate-400 max-w-md">
                      Initializing multi-agent session runtime and loading live interface...
                    </p>
                    <div className="mt-4 flex gap-2">
                      <a
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold transition-colors flex items-center gap-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Direct Launch</span>
                      </a>
                      <button
                        onClick={() => setIsIframeLoading(false)}
                        className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
                      >
                        Dismiss Spinner
                      </button>
                    </div>
                  </div>
                )}

                {/* The Embedded Live Iframe */}
                <div
                  className={`w-full transition-all duration-300 h-[620px] bg-slate-950 ${
                    deviceViewport === 'mobile'
                      ? 'max-w-[420px] border-x border-slate-800 shadow-2xl my-2 rounded-xl overflow-hidden'
                      : deviceViewport === 'tablet'
                      ? 'max-w-[768px] border-x border-slate-800 shadow-2xl my-2 rounded-xl overflow-hidden'
                      : 'max-w-full'
                  }`}
                >
                  <iframe
                    key={iframeKey}
                    src={liveUrl}
                    title="Zoar Multi-Agent AI Assistant Live Sample"
                    className="w-full h-full border-0 bg-slate-950"
                    onLoad={() => setIsIframeLoading(false)}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
                  />
                </div>

              </div>

              {/* Bottom Quick Test Banner */}
              <div className="mt-3 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Interactive Live Sample embedded from <strong className="text-slate-200">zoar-ai.vercel.app</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      soundFX.playMechanicalClick();
                      setActiveTab('simulator');
                    }}
                    className="text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <span>Try Routing Engine Simulator</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: MULTI-AGENT ROUTING SIMULATOR */}
          {activeTab === 'simulator' && (
            <div className="rounded-xl bg-slate-950 border border-slate-800 p-5 animate-fadeIn">
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
            </div>
          )}

          {/* TAB 3: SYSTEM ARCHITECTURE & DESIGN */}
          {activeTab === 'tech_specs' && (
            <div className="rounded-xl bg-slate-950 border border-slate-800 p-5 animate-fadeIn space-y-4">
              <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                <div className="text-xs font-mono font-bold text-slate-200 flex items-center gap-2">
                  <Database className="w-4 h-4 text-purple-400" />
                  <span>ZOAR MULTI-AGENT ARCHITECTURE MATRIX</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400">FAISS + GROQ LLM API + SQLITE</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5" />
                    <span>1. Intent Classifier</span>
                  </div>
                  <p className="text-[11px] font-mono text-slate-400 leading-relaxed">
                    Uses fast Groq LLM inference to analyze incoming user queries and route them to designated specialized sub-agents with 95%+ classification accuracy.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5">
                    <Search className="w-3.5 h-3.5" />
                    <span>2. FAISS Vector Search</span>
                  </div>
                  <p className="text-[11px] font-mono text-slate-400 leading-relaxed">
                    Generates 384-dimensional sentence embeddings using sentence-transformers to execute cosine-similarity searches across product databases with sub-millisecond latency.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-xs font-mono font-bold text-emerald-300 flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5" />
                    <span>3. Shared Memory</span>
                  </div>
                  <p className="text-[11px] font-mono text-slate-400 leading-relaxed">
                    Persists cross-agent session contexts inside an ACID-compliant SQLite memory layer, allowing agents to retain user preferences throughout conversation.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Repository Quick Action Dock */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-400">
              <Github className="w-4 h-4 text-slate-300" />
              <span>PROJECT SOURCE: <strong className="text-slate-200">github.com/PrithivAk</strong></span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFX.playMechanicalClick()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 hover:text-white transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Open zoar-ai.vercel.app</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <a
                href={project.githubUrl || resumeData.personalInfo.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFX.playMechanicalClick()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-slate-100 transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-purple-400" />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* FULLSCREEN MODAL RUNNER */}
      {isFullscreenModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col p-2 sm:p-4 animate-fadeIn">
          {/* Modal Header */}
          <div className="flex items-center justify-between gap-4 p-3 bg-slate-900 border border-slate-800 rounded-t-xl">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <div className="text-xs font-mono font-bold text-slate-100">
                ZOAR MULTI-AGENT AI ASSISTANT — FULLSCREEN RUNNER
              </div>
              <span className="text-[11px] font-mono text-cyan-400 hidden sm:inline">
                (https://zoar-ai.vercel.app/)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReloadIframe}
                className="px-2.5 py-1 rounded bg-slate-950 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 flex items-center gap-1"
                title="Reload Session"
              >
                <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                <span>Reload</span>
              </button>

              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold flex items-center gap-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Tab</span>
              </a>

              <button
                onClick={() => {
                  soundFX.playMechanicalClick();
                  setIsFullscreenModal(false);
                }}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                title="Close Fullscreen View"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Iframe Content */}
          <div className="flex-1 bg-slate-950 border-x border-b border-slate-800 rounded-b-xl overflow-hidden relative">
            <iframe
              src={liveUrl}
              title="Zoar AI Fullscreen Preview"
              className="w-full h-full border-0 bg-slate-950"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
            />
          </div>
        </div>
      )}

    </section>
  );
};

