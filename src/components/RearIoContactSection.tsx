import React, { useState, useEffect } from 'react';
import { TypewriterText } from './TypewriterText';
import {
  Send,
  Mail,
  Phone,
  Linkedin,
  Github,
  Code,
  Award,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Activity,
  Radio,
  Zap,
  ArrowDown,
  Cpu
} from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { soundFX } from '../utils/audioSynth';

interface RearIoContactSectionProps {
  isOverclocked: boolean;
}

export const RearIoContactSection: React.FC<RearIoContactSectionProps> = ({ isOverclocked }) => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [copiedPort, setCopiedPort] = useState<string | null>(null);
  const [rxPacketCount, setRxPacketCount] = useState(1024);
  const [lastRxPayload, setLastRxPayload] = useState('CPU_BUS_SYNC_0x4F');

  // React to scrolling to receive incoming chip data packets
  useEffect(() => {
    const handleScroll = () => {
      if (Math.random() < 0.3) {
        setRxPacketCount((prev) => prev + 1);
        const hex = Math.floor(Math.random() * 0xffff).toString(16).toUpperCase();
        setLastRxPayload(`CHIP_PKT_0x${hex}`);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopy = (text: string, portName: string) => {
    soundFX.playMechanicalClick();
    navigator.clipboard.writeText(text);
    setCopiedPort(portName);
    setTimeout(() => setCopiedPort(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;

    soundFX.playRelaySwitch();
    setIsSending(true);

    setTimeout(() => {
      soundFX.playPulseSound();
      setIsSending(false);
      setSentSuccess(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setSentSuccess(false), 4000);
    }, 1200);
  };

  return (
    <section id="sec-io" className="relative py-8 px-4 pb-16">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded border ${isOverclocked ? 'border-amber-500 bg-amber-950/40 text-amber-400' : 'border-cyan-500 bg-cyan-950/40 text-cyan-400'}`}>
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold font-mono text-slate-100 tracking-tight flex items-center gap-2">
                CONTACT & CONNECTIVITY
              </h2>
              <p className="text-xs font-mono text-slate-400">
                EXTERNAL COMMUNICATION CHANNELS
              </p>
            </div>
          </div>

          <div className="text-xs font-mono px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>OPEN FOR OPPORTUNITIES</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Direct Contact Channels (6 cols) */}
          <div className="lg:col-span-6 rounded-2xl bg-slate-900/90 border-2 border-slate-800 backdrop-blur-md p-6 space-y-4 relative animate-water-drop">
            
            {/* IO Shield Screws */}
            <div className="absolute top-2 left-2 w-2 h-2 rounded-full border border-slate-700 bg-slate-800" />
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full border border-slate-700 bg-slate-800" />

            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2 flex justify-between">
              <span>DIRECT CONTACT PORTS</span>
              <span className="text-cyan-400 flex items-center gap-1"><Zap className="w-3 h-3 text-amber-400" /> INSTANT</span>
            </div>

            {/* Email */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-colors flex items-center justify-between gap-3 group relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 photon-light-beam" />
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-cyan-400 relative">
                  <Mail className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1">
                    <span>EMAIL ADDRESS</span>
                  </div>
                  <div className="text-xs font-mono font-bold text-slate-100">
                    <TypewriterText text={resumeData.personalInfo.email} speed={20} cursorColor="cyan" />
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleCopy(resumeData.personalInfo.email, 'email')}
                className="p-2 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono transition-colors"
                title="Copy Email"
              >
                {copiedPort === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              </button>
            </div>

            {/* LinkedIn */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 transition-colors flex items-center justify-between gap-3 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 photon-light-beam" />
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-blue-400 relative">
                  <Linkedin className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1">
                    <span>LINKEDIN PROFILE</span>
                  </div>
                  <div className="text-xs font-mono font-bold text-slate-100 truncate max-w-[180px]">prithiv-ak-694894328</div>
                </div>
              </div>

              <a
                href={resumeData.personalInfo.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              </a>
            </div>

            {/* GitHub, LeetCode, HackerRank */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <a
                href={resumeData.personalInfo.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/50 text-center transition-colors group relative"
              >
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                <Github className="w-4 h-4 text-purple-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <div className="text-[10px] font-mono font-bold text-slate-200">GitHub</div>
              </a>

              <a
                href={resumeData.personalInfo.links.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 text-center transition-colors group relative"
              >
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                <Code className="w-4 h-4 text-amber-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <div className="text-[10px] font-mono font-bold text-slate-200">LeetCode</div>
              </a>

              <a
                href={resumeData.personalInfo.links.hackerrank}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 text-center transition-colors group relative"
              >
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <Award className="w-4 h-4 text-emerald-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <div className="text-[10px] font-mono font-bold text-slate-200">HackerRank</div>
              </a>
            </div>

          </div>

          {/* Right: Message Form (6 cols) */}
          <div className="lg:col-span-6 rounded-2xl bg-slate-900/90 border-2 border-slate-800 backdrop-blur-md p-6 animate-water-drop" style={{ animationDelay: '200ms' }}>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4 flex items-center justify-between">
              <span>SEND DIRECT MESSAGE</span>
              <span className="text-cyan-400 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                ACTIVE
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">YOUR NAME</label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="e.g. Hiring Manager / Recruiter"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-lg px-3 py-2 text-xs font-mono text-slate-100 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">YOUR EMAIL</label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="your.email@company.com"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-lg px-3 py-2 text-xs font-mono text-slate-100 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">YOUR MESSAGE</label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Hello Prithiv, we reviewed your resume and would love to discuss an AI / Full Stack role..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-lg px-3 py-2 text-xs font-mono text-slate-100 outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-extrabold text-xs transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              >
                {isSending ? (
                  <>
                    <Activity className="w-4 h-4 animate-spin" />
                    <span>SENDING...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>SEND MESSAGE</span>
                  </>
                )}
              </button>
            </form>

            {sentSuccess && (
              <div className="mt-4 p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-xs font-mono text-emerald-300 flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>MESSAGE SENT SUCCESSFULLY! Thank you for reaching out to Prithiv A K.</span>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

