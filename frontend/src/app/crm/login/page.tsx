'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCRM } from '../context/CRMContext';
import { ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';

function NexoraLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="url(#nx-login)" />
      <path d="M8 24V8l8 8 8-8v16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="nx-login" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7c3aed" />
          <stop offset="1" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function LoginPage() {
  const { login } = useCRM();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(email, password);
    if (result.success) {
      router.push('/crm/dashboard');
    } else {
      setError(result.error || 'Login failed.');
    }
    setLoading(false);
  };

  const fillDemo = () => { setEmail('admin@crm.com'); setPassword('admin123'); };

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(124,58,237,0.2)',
    color: 'white',
  };
  const inputFocus = (e: any) => (e.target.style.borderColor = 'rgba(124,58,237,0.55)');
  const inputBlur = (e: any) => (e.target.style.borderColor = 'rgba(124,58,237,0.2)');

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(124,58,237,0.08) 0%, #090712 65%)' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'rgba(124,58,237,0.07)' }}
      />

      <div className="relative w-full max-w-sm">
        {/* Logo + brand */}
        <div className="flex flex-col items-center mb-8 gap-3">
          <div style={{ filter: 'drop-shadow(0 0 18px rgba(124,58,237,0.45))' }}>
            <NexoraLogo size={48} />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold text-white tracking-tight">Nexora Systems</h1>
            <p className="text-xs mt-1 font-medium" style={{ color: '#7c3aed' }}>ClientOS · Workspace Login</p>
          </div>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-7"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(124,58,237,0.15)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'rgba(148,163,184,0.7)' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="w-full rounded-xl px-4 py-2.5 text-sm placeholder-slate-600 focus:outline-none transition-all"
                style={inputStyle}
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'rgba(148,163,184,0.7)' }}>Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl px-4 py-2.5 pr-10 text-sm placeholder-slate-600 focus:outline-none transition-all"
                  style={inputStyle}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: 'rgba(100,116,139,0.6)' }}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-xs rounded-xl px-4 py-2.5" style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.2)', color: '#f87171' }}>
                <AlertCircle size={13} className="flex-shrink-0" /> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full font-semibold rounded-xl py-2.5 flex items-center justify-center gap-2 transition-all mt-1"
              style={{
                background: loading ? 'rgba(124,58,237,0.5)' : 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                color: 'white',
                boxShadow: loading ? 'none' : '0 8px 20px rgba(124,58,237,0.3)',
              }}
            >
              {loading
                ? <div className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: 'white' }} />
                : <><span className="text-sm">Sign In</span><ArrowRight size={15} /></>
              }
            </button>
          </form>

          {/* Demo hint */}
          <div className="mt-5 pt-5" style={{ borderTop: '1px solid rgba(124,58,237,0.1)' }}>
            <p className="text-[10px] text-center mb-2.5" style={{ color: 'rgba(100,116,139,0.6)' }}>Demo credentials</p>
            <button
              onClick={fillDemo}
              className="w-full text-xs rounded-xl px-4 py-2 transition-all font-mono"
              style={{
                background: 'rgba(124,58,237,0.08)',
                border: '1px solid rgba(124,58,237,0.15)',
                color: 'rgba(167,139,250,0.8)',
              }}
            >
              admin@crm.com · admin123
            </button>
          </div>
        </div>

        <p className="text-center text-[10px] mt-5" style={{ color: 'rgba(71,85,105,0.7)' }}>
          Built by <span style={{ color: 'rgba(124,58,237,0.7)' }}>Fonso Dev</span> · ClientOS Platform
        </p>
      </div>
    </div>
  );
}
