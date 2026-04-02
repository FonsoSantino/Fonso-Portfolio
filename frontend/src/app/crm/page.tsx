'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCRM } from './context/CRMContext';

const BOOT_LOGS = [
  { delay: 0,    text: 'Initializing Nexora ClientOS v2.0...' },
  { delay: 400,  text: 'Loading system configuration...' },
  { delay: 800,  text: 'Connecting to secure database...' },
  { delay: 1200, text: 'Authenticating credentials...' },
  { delay: 1600, text: 'Loading client data...' },
  { delay: 2000, text: 'Synchronizing project records...' },
  { delay: 2400, text: 'System ready.' },
];

function NexoraLogoLarge() {
  return (
    <svg width="56" height="56" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="9" fill="url(#nx-lg)" />
      <path d="M8 24V8l8 8 8-8v16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="nx-lg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7c3aed" />
          <stop offset="1" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function CRMRoot() {
  const { isAuthenticated, authLoading } = useCRM();
  const router = useRouter();
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Progressive log reveal
    BOOT_LOGS.forEach(({ delay, text }) => {
      setTimeout(() => {
        setVisibleLogs(prev => [...prev, text]);
      }, delay);
    });

    // After all logs, redirect
    const total = BOOT_LOGS[BOOT_LOGS.length - 1].delay + 700;
    setTimeout(() => {
      setDone(true);
      if (!authLoading) {
        router.replace(isAuthenticated ? '/crm/dashboard' : '/crm/login');
      }
    }, total);
  }, []);

  // If auth is resolved early, redirect after animation
  useEffect(() => {
    if (done && !authLoading) {
      router.replace(isAuthenticated ? '/crm/dashboard' : '/crm/login');
    }
  }, [done, authLoading, isAuthenticated]);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(124,58,237,0.08) 0%, #090712 60%)' }}
    >
      {/* Glow orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: 'rgba(124,58,237,0.12)' }}
      />

      <div className="relative flex flex-col items-center gap-8 px-8 max-w-sm w-full">
        {/* Logo */}
        <div className="flex flex-col items-center gap-4">
          <div style={{ filter: 'drop-shadow(0 0 24px rgba(124,58,237,0.5))' }}>
            <NexoraLogoLarge />
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-white tracking-tight">Nexora Systems</p>
            <p className="text-xs mt-0.5 font-medium" style={{ color: '#7c3aed' }}>ClientOS · CRM Platform</p>
          </div>
        </div>

        {/* Spinner */}
        <div className="relative w-10 h-10">
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
            style={{ borderTopColor: '#7c3aed', borderRightColor: 'rgba(124,58,237,0.3)' }}
          />
          <div
            className="absolute inset-1.5 rounded-full"
            style={{ background: 'rgba(124,58,237,0.1)' }}
          />
        </div>

        {/* Boot logs */}
        <div
          className="w-full rounded-xl px-4 py-3 space-y-1 font-mono"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(124,58,237,0.15)' }}
        >
          {visibleLogs.map((log, i) => (
            <div
              key={i}
              className="text-[11px] flex items-center gap-2"
              style={{
                color: i === visibleLogs.length - 1 ? '#a78bfa' : 'rgba(100,116,139,0.7)',
                animation: 'fadeIn 0.3s ease',
              }}
            >
              <span style={{ color: '#7c3aed' }}>&gt;</span>
              {log}
              {i === visibleLogs.length - 1 && !done && (
                <span className="animate-pulse">_</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  );
}
