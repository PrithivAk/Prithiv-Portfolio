import React, { useEffect, useRef } from 'react';
import { soundFX } from '../utils/audioSynth';

interface CircuitCanvasProps {
  isOverclocked: boolean;
  isDebugMode: boolean;
}

// Server Node / Blade Bay Definition
interface ServerBlade {
  id: string;
  name: string;
  type: 'compute' | 'storage' | 'optical' | 'ai_cluster';
  x: number;
  y: number;
  width: number;
  height: number;
  rackId: string;
  leds: { color: string; rate: number; phase: number }[];
  flashIntensity: number; // 0 to 1, blooms when data flashes into it
  lastFlashPayload?: string;
  lastFlashTime: number;
  totalFlashes: number;
}

// Data Flash Packet shooting directly into a server
interface DataFlash {
  id: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  targetBladeIndex: number;
  progress: number; // 0 (origin) to 1 (server intake)
  speed: number;
  color: string;
  payload: string;
  size: number;
  sparkles: { x: number; y: number; vx: number; vy: number; life: number }[];
}

// Flash Impact Bloom when data hits the server
interface ServerImpactBloom {
  x: number;
  y: number;
  color: string;
  radius: number;
  maxRadius: number;
  alpha: number;
  text?: string;
}

export const CircuitCanvas: React.FC<CircuitCanvasProps> = ({ isOverclocked, isDebugMode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initServerInfrastructure();
    };
    window.addEventListener('resize', handleResize);

    const FLASH_PAYLOADS = [
      'FLASH ➔ NODE_01', '100Gbps WRITE', 'NVMe_BURST', 'DATA_FLASH ⚡',
      'AI_INGEST', 'OPTICAL_SYNC', 'CLUSTER_WRITE', 'BUFFER_COMMIT',
      'RDMA_DIRECT', 'FLASH_STORE [ACK]', '400G_OPTIC', 'MEM_CACHE'
    ];

    let serverBlades: ServerBlade[] = [];
    const dataFlashes: DataFlash[] = [];
    const impactBlooms: ServerImpactBloom[] = [];
    let flashCounter = 0;

    // Initialize Server Blade Racks on both sides & subtle background grid
    const initServerInfrastructure = () => {
      serverBlades = [];
      
      const rackWidth = Math.min(220, Math.max(140, width * 0.18));
      const bladeHeight = 36;
      const bladeGap = 10;
      const startY = 80;
      const availableHeight = height - 120;
      const bladesPerRack = Math.max(3, Math.min(8, Math.floor(availableHeight / (bladeHeight + bladeGap))));

      // Left Server Blade Cluster (Compute & AI Nodes)
      for (let i = 0; i < bladesPerRack; i++) {
        const by = startY + i * (bladeHeight + bladeGap);
        const bladeType: ServerBlade['type'] = i % 3 === 0 ? 'ai_cluster' : i % 2 === 0 ? 'compute' : 'storage';
        serverBlades.push({
          id: `L-BLADE-${i + 1}`,
          name: `SRV_RACK_A${i + 1}`,
          type: bladeType,
          x: 20,
          y: by,
          width: rackWidth,
          height: bladeHeight,
          rackId: 'RACK-ALPHA-01',
          leds: [
            { color: '#10b981', rate: 2 + Math.random() * 3, phase: Math.random() * Math.PI },
            { color: '#00f0ff', rate: 3 + Math.random() * 4, phase: Math.random() * Math.PI },
            { color: '#f59e0b', rate: 1.5 + Math.random() * 2, phase: Math.random() * Math.PI },
            { color: '#38bdf8', rate: 4 + Math.random() * 3, phase: Math.random() * Math.PI },
          ],
          flashIntensity: 0,
          lastFlashTime: 0,
          totalFlashes: 0,
        });
      }

      // Right Server Blade Cluster (High-Speed NVMe Flash & Optical Storage Arrays)
      const rightX = width - rackWidth - 20;
      for (let i = 0; i < bladesPerRack; i++) {
        const by = startY + i * (bladeHeight + bladeGap);
        const bladeType: ServerBlade['type'] = i % 2 === 0 ? 'optical' : 'storage';
        serverBlades.push({
          id: `R-BLADE-${i + 1}`,
          name: `FLASH_BAY_B${i + 1}`,
          type: bladeType,
          x: rightX,
          y: by,
          width: rackWidth,
          height: bladeHeight,
          rackId: 'RACK-BETA-02',
          leds: [
            { color: '#00f0ff', rate: 3 + Math.random() * 3, phase: Math.random() * Math.PI },
            { color: '#3b82f6', rate: 2.5 + Math.random() * 2, phase: Math.random() * Math.PI },
            { color: '#10b981', rate: 4 + Math.random() * 3, phase: Math.random() * Math.PI },
            { color: '#f59e0b', rate: 2 + Math.random() * 4, phase: Math.random() * Math.PI },
          ],
          flashIntensity: 0,
          lastFlashTime: 0,
          totalFlashes: 0,
        });
      }
    };

    initServerInfrastructure();

    // Spawn a Data Flash shooting directly into a target server blade
    const spawnDataFlash = (targetBladeIdx?: number, customOriginX?: number, customOriginY?: number, extraSpeed = 0) => {
      if (serverBlades.length === 0) return;
      const targetIdx = targetBladeIdx ?? Math.floor(Math.random() * serverBlades.length);
      const blade = serverBlades[targetIdx];
      if (!blade) return;

      // Optical Port receiver coordinate on the server blade faceplate
      const isLeftRack = blade.x < width / 2;
      const portX = isLeftRack ? blade.x + blade.width - 16 : blade.x + 16;
      const portY = blade.y + blade.height / 2;

      // Origin point: center region or top network switch or custom pointer
      let startX = customOriginX;
      let startY = customOriginY;

      if (startX === undefined || startY === undefined) {
        if (Math.random() > 0.4) {
          // Central high-speed network core
          startX = width / 2 + (Math.random() * 200 - 100);
          startY = Math.random() * height * 0.8 + 40;
        } else {
          // Viewport edge ingress
          startX = isLeftRack ? width * 0.6 : width * 0.4;
          startY = Math.random() * height;
        }
      }

      const payload = FLASH_PAYLOADS[Math.floor(Math.random() * FLASH_PAYLOADS.length)];
      const baseSpeed = isOverclocked ? 0.016 + Math.random() * 0.014 : 0.009 + Math.random() * 0.009;

      dataFlashes.push({
        id: ++flashCounter,
        startX,
        startY,
        targetX: portX,
        targetY: portY,
        targetBladeIndex: targetIdx,
        progress: 0,
        speed: baseSpeed + extraSpeed,
        color: isOverclocked ? '#f59e0b' : '#00f0ff',
        payload,
        size: isOverclocked ? 4.5 : 3.5,
        sparkles: Array.from({ length: 5 }).map(() => ({
          x: 0,
          y: 0,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1,
        })),
      });
    };

    // Initial pool of incoming data flashes
    for (let i = 0; i < 14; i++) {
      spawnDataFlash();
      if (dataFlashes[i]) {
        dataFlashes[i].progress = Math.random() * 0.85;
      }
    }

    // Scroll listener accelerates data flash ingestion
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      if (delta > 3) {
        const count = Math.min(Math.floor(delta / 5) + 1, 6);
        for (let i = 0; i < count; i++) {
          spawnDataFlash(undefined, undefined, undefined, 0.006);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      // Periodically flash data from mouse pointer into nearest server
      if (Math.random() < 0.15 && serverBlades.length > 0) {
        // Find closest server blade
        let nearestIdx = 0;
        let minDist = Infinity;
        serverBlades.forEach((blade, idx) => {
          const d = Math.hypot(blade.x + blade.width / 2 - mouseX, blade.y + blade.height / 2 - mouseY);
          if (d < minDist) {
            minDist = d;
            nearestIdx = idx;
          }
        });
        spawnDataFlash(nearestIdx, mouseX, mouseY, 0.01);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      soundFX.playPulseSound();

      // Multi-cluster simultaneous data flash burst into all servers
      serverBlades.forEach((_, idx) => {
        spawnDataFlash(idx, clickX, clickY, 0.008);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    let time = 0;

    // Main Render Loop: Server Racks + Data Flash Ingest
    const render = () => {
      time += 0.025;
      ctx.clearRect(0, 0, width, height);

      // Deep Server Room Datacenter Chassis Atmosphere
      ctx.fillStyle = isOverclocked ? 'rgba(14, 9, 20, 0.94)' : 'rgba(6, 10, 18, 0.94)';
      ctx.fillRect(0, 0, width, height);

      // Subtle Datacenter Server Rack Floor / Ceiling Optical Laser Grid
      ctx.lineWidth = 1;
      const gridColor = isOverclocked ? 'rgba(245, 158, 11, 0.04)' : 'rgba(0, 240, 255, 0.04)';
      ctx.strokeStyle = gridColor;

      // Perspective Optical Fiber Guide Lines connecting central network to server racks
      serverBlades.forEach((blade) => {
        const isLeft = blade.x < width / 2;
        const portX = isLeft ? blade.x + blade.width : blade.x;
        const portY = blade.y + blade.height / 2;

        ctx.beginPath();
        ctx.setLineDash([4, 8]);
        ctx.moveTo(width / 2, height / 2 + Math.sin(time + blade.y) * 20);
        ctx.lineTo(portX, portY);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // 1. Render Server Blade Racks & Bays
      serverBlades.forEach((blade) => {
        const isLeft = blade.x < width / 2;
        const isHovered = mouseX >= blade.x && mouseX <= blade.x + blade.width && mouseY >= blade.y && mouseY <= blade.y + blade.height;

        // Decay flash bloom intensity
        if (blade.flashIntensity > 0) {
          blade.flashIntensity = Math.max(0, blade.flashIntensity - 0.035);
        }

        // Server Blade Chassis Background Box
        const baseBg = isOverclocked
          ? `rgba(26, 18, 36, ${0.7 + blade.flashIntensity * 0.3})`
          : `rgba(12, 20, 32, ${0.7 + blade.flashIntensity * 0.3})`;
        ctx.fillStyle = baseBg;
        ctx.fillRect(blade.x, blade.y, blade.width, blade.height);

        // Server Blade Metallic Border & Active Flash Glow
        const borderColor = blade.flashIntensity > 0.2
          ? isOverclocked ? '#f59e0b' : '#00f0ff'
          : isHovered
          ? isOverclocked ? 'rgba(245, 158, 11, 0.5)' : 'rgba(0, 240, 255, 0.5)'
          : isOverclocked ? 'rgba(245, 158, 11, 0.15)' : 'rgba(6, 182, 212, 0.15)';

        ctx.lineWidth = blade.flashIntensity > 0.2 || isHovered ? 2 : 1;
        ctx.strokeStyle = borderColor;
        ctx.strokeRect(blade.x, blade.y, blade.width, blade.height);

        // Flash Ingest Bloom inside Server Unit
        if (blade.flashIntensity > 0.05) {
          ctx.fillStyle = isOverclocked
            ? `rgba(245, 158, 11, ${blade.flashIntensity * 0.25})`
            : `rgba(0, 240, 255, ${blade.flashIntensity * 0.25})`;
          ctx.fillRect(blade.x, blade.y, blade.width, blade.height);
        }

        // Server Blade Faceplate Grills (Airflow Vents)
        ctx.fillStyle = isOverclocked ? 'rgba(245, 158, 11, 0.08)' : 'rgba(0, 240, 255, 0.06)';
        const ventStartX = isLeft ? blade.x + 8 : blade.x + 40;
        const ventWidth = blade.width - 64;
        for (let vx = 0; vx < ventWidth; vx += 6) {
          ctx.fillRect(ventStartX + vx, blade.y + 6, 2, blade.height - 12);
        }

        // Server Telemetry Activity LEDs
        const ledStartX = isLeft ? blade.x + 10 : blade.x + blade.width - 34;
        blade.leds.forEach((led, lIdx) => {
          const lx = ledStartX + lIdx * 6;
          const ly = blade.y + blade.height / 2;
          const isFlashing = blade.flashIntensity > 0.1;
          const blink = isFlashing || Math.sin(time * led.rate + led.phase) > 0;

          ctx.fillStyle = blink ? (isFlashing ? '#ffffff' : led.color) : 'rgba(255,255,255,0.1)';
          ctx.beginPath();
          ctx.arc(lx, ly, isFlashing ? 2.5 : 1.8, 0, Math.PI * 2);
          ctx.fill();

          if (blink && (isFlashing || blade.flashIntensity > 0.3)) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = led.color;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        });

        // Optical Ingest Port (Receptacle where data flashes in)
        const portX = isLeft ? blade.x + blade.width - 16 : blade.x + 16;
        const portY = blade.y + blade.height / 2;

        ctx.fillStyle = blade.flashIntensity > 0.1
          ? isOverclocked ? '#fde047' : '#ffffff'
          : isOverclocked ? '#b45309' : '#0891b2';
        ctx.fillRect(portX - 4, portY - 4, 8, 8);

        ctx.strokeStyle = isOverclocked ? '#f59e0b' : '#00f0ff';
        ctx.lineWidth = 1;
        ctx.strokeRect(portX - 5, portY - 5, 10, 10);

        // Server Blade Label
        ctx.fillStyle = isOverclocked ? 'rgba(245, 158, 11, 0.7)' : 'rgba(148, 163, 184, 0.7)';
        ctx.font = '8px monospace';
        const labelX = isLeft ? blade.x + 10 : blade.x + 36;
        ctx.fillText(`${blade.name} [${blade.type.toUpperCase()}]`, labelX, blade.y + blade.height - 8);

        // Flash Ingest Status Flag overlay
        if (blade.flashIntensity > 0.2 && blade.lastFlashPayload) {
          ctx.fillStyle = isOverclocked ? '#fde047' : '#a5f3fc';
          ctx.font = 'bold 8px monospace';
          const tagX = isLeft ? blade.x + blade.width + 8 : blade.x - 70;
          ctx.fillText(`⚡ FLASH INGEST: ${blade.totalFlashes}`, tagX, blade.y + blade.height / 2 + 3);
        }
      });

      // 2. Maintain active Data Flash stream density
      const targetDensity = isOverclocked ? 26 : 18;
      if (dataFlashes.length < targetDensity && Math.random() < 0.2) {
        spawnDataFlash();
      }

      // 3. Render & Animate Data Flash Pulses Shooting into Servers
      for (let i = dataFlashes.length - 1; i >= 0; i--) {
        const flash = dataFlashes[i];
        flash.progress += flash.speed;

        // When data reaches server optical port: Trigger Server Flash Bloom & Impact
        if (flash.progress >= 1) {
          const targetBlade = serverBlades[flash.targetBladeIndex];
          if (targetBlade) {
            targetBlade.flashIntensity = 1.0;
            targetBlade.lastFlashPayload = flash.payload;
            targetBlade.lastFlashTime = Date.now();
            targetBlade.totalFlashes++;

            // Create Server Ingest Impact Bloom
            impactBlooms.push({
              x: flash.targetX,
              y: flash.targetY,
              color: flash.color,
              radius: 4,
              maxRadius: isOverclocked ? 28 : 20,
              alpha: 1.0,
              text: flash.payload,
            });
          }

          dataFlashes.splice(i, 1);
          continue;
        }

        // Current trajectory coordinate
        const currentX = flash.startX + (flash.targetX - flash.startX) * flash.progress;
        const currentY = flash.startY + (flash.targetY - flash.startY) * flash.progress;

        // Tail trail coordinate
        const tailProgress = Math.max(0, flash.progress - 0.18);
        const tailX = flash.startX + (flash.targetX - flash.startX) * tailProgress;
        const tailY = flash.startY + (flash.targetY - flash.startY) * tailProgress;

        // Draw Photonic Laser Flash Beam
        const gradient = ctx.createLinearGradient(tailX, tailY, currentX, currentY);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.5, isOverclocked ? 'rgba(245, 158, 11, 0.3)' : 'rgba(0, 240, 255, 0.3)');
        gradient.addColorStop(1, flash.color);

        ctx.lineWidth = isOverclocked ? 3.5 : 2.5;
        ctx.strokeStyle = gradient;
        ctx.shadowBlur = isOverclocked ? 18 : 12;
        ctx.shadowColor = flash.color;

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();

        // Flash Core Leading Photon
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(currentX, currentY, isOverclocked ? 3.8 : 2.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0; // reset shadow for performance

        // Data Flash Payload Label
        ctx.fillStyle = isOverclocked ? '#fef08a' : '#cffafe';
        ctx.font = 'bold 8.5px monospace';
        ctx.fillText(flash.payload, currentX + 8, currentY + 3);

        // Flash Ionization Sparkles
        flash.sparkles.forEach((sp) => {
          sp.x += sp.vx;
          sp.y += sp.vy;
          sp.life -= 0.03;
          if (sp.life > 0) {
            ctx.fillStyle = flash.color;
            ctx.globalAlpha = sp.life;
            ctx.fillRect(currentX + sp.x * 6, currentY + sp.y * 6, 1.5, 1.5);
            ctx.globalAlpha = 1.0;
          }
        });
      }

      // 4. Render Server Ingest Impact Blooms
      for (let i = impactBlooms.length - 1; i >= 0; i--) {
        const bloom = impactBlooms[i];
        bloom.radius += (bloom.maxRadius - bloom.radius) * 0.2;
        bloom.alpha -= 0.05;

        if (bloom.alpha <= 0) {
          impactBlooms.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = bloom.alpha;

        // Radiant Flash Wave
        ctx.strokeStyle = bloom.color;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 15;
        ctx.shadowColor = bloom.color;
        ctx.beginPath();
        ctx.arc(bloom.x, bloom.y, bloom.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Inner Flash Disc
        ctx.fillStyle = bloom.color;
        ctx.beginPath();
        ctx.arc(bloom.x, bloom.y, bloom.radius * 0.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // 5. Interactive Mouse Emitter Guide Beam
      if (mouseX > 0 && mouseY > 0) {
        ctx.strokeStyle = isOverclocked ? 'rgba(245, 158, 11, 0.3)' : 'rgba(0, 240, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 16 + Math.sin(time * 6) * 4, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Debug / Telemetry Overlay
      if (isDebugMode) {
        ctx.fillStyle = isOverclocked ? 'rgba(245,158,11,0.9)' : 'rgba(6,182,212,0.9)';
        ctx.font = '10px monospace';
        ctx.fillText(
          `SERVER FLASH CLUSTERS: ${serverBlades.length} UNITS | ACTIVE FLASH STREAMS: ${dataFlashes.length} | CLOCK: ${isOverclocked ? 'OVERCLOCK 5.2GHz' : '4.8GHz OPTICAL'}`,
          20,
          height - 20
        );
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOverclocked, isDebugMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-auto z-0 opacity-85 transition-opacity duration-500"
    />
  );
};



