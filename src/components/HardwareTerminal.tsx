import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Send, Play } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { TerminalLog } from '../types';
import { soundFX } from '../utils/audioSynth';

interface HardwareTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  isOverclocked: boolean;
  setIsOverclocked: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export const HardwareTerminal: React.FC<HardwareTerminalProps> = ({
  isOpen,
  onClose,
  isOverclocked,
  setIsOverclocked,
}) => {
  const [inputVal, setInputVal] = useState<string>('');
  const [logs, setLogs] = useState<TerminalLog[]>([
    {
      id: '1',
      type: 'system',
      content: 'PRITHIV-OS v4.2 BIOS HARDWARE TERMINAL\nType "help" for a list of available system diagnostics.',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, isOpen]);

  if (!isOpen) return null;

  const handleRunCommand = (cmdStr: string) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    soundFX.playMechanicalClick();
    const cmd = raw.toLowerCase();

    const newLogs: TerminalLog[] = [
      ...logs,
      {
        id: Date.now().toString(),
        type: 'input',
        content: `$ ${raw}`,
        timestamp: new Date().toLocaleTimeString(),
      },
    ];

    let output = '';

    if (cmd === 'help') {
      output = `AVAILABLE COMMANDS:
  help        - Show this help menu
  profile     - Print core CPU profile & objective
  skills      - Dump RAM technical skill registers
  projects    - Show Zoar Multi-Agent AI Assistant
  github      - Open GitHub project & repository
  exp         - Show Barola & Techvolt internships
  education   - Show V.S.B. College & HSC details
  certs       - Show certified firmware credentials
  contact     - Display I/O contact & developer links
  overclock   - Toggle Turbo Overclock state
  zoar        - Simulate Zoar multi-agent query
  clear       - Clear terminal output screen`;
    } else if (cmd === 'profile' || cmd === 'bio' || cmd === 'whoami') {
      output = `CPU PROFILE: ${resumeData.personalInfo.name}
SPECIALIZATION: ${resumeData.personalInfo.specialization}
OBJECTIVE: ${resumeData.objective}`;
    } else if (cmd === 'skills' || cmd === 'ram') {
      output = `TECHNICAL SKILLS:
  Programming : ${resumeData.skills.programming.join(', ')}
  Database    : ${resumeData.skills.database.join(', ')}
  Core Areas  : ${resumeData.skills.coreAreas.join(', ')}`;
    } else if (cmd === 'projects' || cmd === 'pcie') {
      const p = resumeData.projects[0];
      output = `FLAGSHIP PROJECT: ${p.title} — ${p.subtitle}
TECH STACK: ${p.techStack.join(', ')}
GITHUB URL: ${p.githubUrl || resumeData.personalInfo.links.github}
HIGHLIGHTS:
  - ${p.description[0]}
  - ${p.description[1]}
  - ${p.description[2]}`;
    } else if (cmd === 'github' || cmd === 'git' || cmd === 'repo' || cmd === 'zoar git') {
      const p = resumeData.projects[0];
      const targetUrl = p.githubUrl || resumeData.personalInfo.links.github;
      window.open(targetUrl, '_blank');
      output = `OPENING GITHUB REPOSITORY...
URL: ${targetUrl}
PROFILE: https://github.com/PrithivAk
[SUCCESS]: Project repository launched in new browser tab.`;
    } else if (cmd === 'exp' || cmd === 'nvme' || cmd === 'internships') {
      output = resumeData.internships
        .map((i) => `[${i.company}] ${i.role} (${i.period})\n  - ${i.description.join('\n  - ')}`)
        .join('\n\n');
    } else if (cmd === 'education' || cmd === 'power') {
      output = resumeData.education
        .map((e) => `[${e.degree}] - ${e.institution} | ${e.metric}`)
        .join('\n');
    } else if (cmd === 'certs') {
      output = resumeData.certifications
        .map((c) => `[${c.code}] ${c.title} — ${c.provider}`)
        .join('\n');
    } else if (cmd === 'contact' || cmd === 'io') {
      output = `EMAIL    : ${resumeData.personalInfo.email}
PHONE    : +91 ${resumeData.personalInfo.phone}
LINKEDIN : ${resumeData.personalInfo.links.linkedin}
GITHUB   : ${resumeData.personalInfo.links.github}
LEETCODE : ${resumeData.personalInfo.links.leetcode}
HACKERRANK: ${resumeData.personalInfo.links.hackerrank}`;
    } else if (cmd === 'overclock' || cmd === 'turbo') {
      setIsOverclocked((prev) => !prev);
      soundFX.playOverclockChime();
      output = `SYSTEM OVERCLOCK TOGGLED! New status: ${!isOverclocked ? '4.8GHz TURBO ON' : '3.2GHz STABLE'}`;
    } else if (cmd.startsWith('zoar')) {
      output = `[ZOAR SIMULATOR]: Intent classifier routed query to [A2-FAISS-SEARCH]. Matching vector cosine similarity = 0.961. Context persistent in SQLite memory layer.`;
    } else if (cmd === 'clear') {
      setLogs([]);
      setInputVal('');
      return;
    } else {
      output = `Command not recognized: "${raw}". Type "help" for a list of commands.`;
    }

    newLogs.push({
      id: (Date.now() + 1).toString(),
      type: output.includes('not recognized') ? 'error' : 'output',
      content: output,
      timestamp: new Date().toLocaleTimeString(),
    });

    setLogs(newLogs);
    setInputVal('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="w-full max-w-3xl h-[80vh] max-h-[600px] bg-slate-950 rounded-2xl border-2 border-cyan-500/60 shadow-[0_0_30px_rgba(6,182,212,0.3)] flex flex-col overflow-hidden">
        
        {/* Terminal Header Bar */}
        <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-xs font-bold text-slate-100 uppercase tracking-widest">
              PRITHIV-OS v4.2 BIOS TERMINAL
            </span>
          </div>

          <button
            onClick={() => {
              soundFX.playMechanicalClick();
              onClose();
            }}
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Console Log Screen */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-3 bg-slate-950 text-slate-200">
          {logs.map((log) => (
            <div key={log.id} className="whitespace-pre-wrap leading-relaxed">
              {log.type === 'input' && (
                <div className="text-cyan-400 font-bold">{log.content}</div>
              )}
              {log.type === 'output' && (
                <div className="text-slate-300 pl-3 border-l-2 border-cyan-500/40 my-1">{log.content}</div>
              )}
              {log.type === 'system' && (
                <div className="text-amber-300 bg-amber-950/30 p-2 rounded border border-amber-500/30 mb-2">{log.content}</div>
              )}
              {log.type === 'error' && (
                <div className="text-red-400 bg-red-950/30 p-2 rounded border border-red-500/30">{log.content}</div>
              )}
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Command Quick Presets */}
        <div className="px-3 py-2 bg-slate-900/90 border-t border-slate-800 flex flex-wrap gap-1.5 text-[10px] font-mono">
          <span className="text-slate-500 self-center">Presets:</span>
          {['help', 'profile', 'skills', 'projects', 'github', 'exp', 'contact', 'overclock'].map((cmd, i) => (
            <button
              key={i}
              onClick={() => handleRunCommand(cmd)}
              className="px-2 py-0.5 rounded bg-slate-950 hover:bg-slate-800 border border-slate-700 text-cyan-300 transition-colors"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
          <span className="font-mono text-cyan-400 font-bold">$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleRunCommand(inputVal);
            }}
            placeholder="Type command ('help', 'skills', 'projects')..."
            className="flex-1 bg-transparent text-xs font-mono text-slate-100 outline-none placeholder-slate-600"
            autoFocus
          />
          <button
            onClick={() => handleRunCommand(inputVal)}
            className="p-1.5 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
