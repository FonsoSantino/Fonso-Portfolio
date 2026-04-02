'use client';

import { Search, Bell } from 'lucide-react';
import { useCRM } from '../context/CRMContext';

interface TopbarProps {
  title: string;
  subtitle?: string;
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
  actions?: React.ReactNode;
}

export function Topbar({ title, subtitle, onSearch, searchPlaceholder = 'Search...', actions }: TopbarProps) {
  const { user, stats } = useCRM();

  const handleSearch = (v: string) => onSearch?.(v);

  return (
    <header
      className="h-16 flex items-center gap-4 px-6 sticky top-0 z-20"
      style={{
        background: 'rgba(9,7,18,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(124,58,237,0.08)',
      }}
    >
      {/* Title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-base font-bold text-white truncate tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs truncate" style={{ color: 'rgba(100,116,139,0.7)' }}>{subtitle}</p>}
      </div>

      {/* Search */}
      {onSearch && (
        <div className="relative hidden sm:block">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(100,116,139,0.6)' }} />
          <input
            onChange={e => handleSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-52 rounded-xl pl-9 pr-4 py-1.5 text-sm text-white placeholder-slate-600 focus:outline-none transition-all"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(124,58,237,0.15)',
            }}
            onFocus={e => (e.target.style.borderColor = 'rgba(124,58,237,0.4)')}
            onBlur={e => (e.target.style.borderColor = 'rgba(124,58,237,0.15)')}
          />
        </div>
      )}

      {/* Custom actions */}
      {actions}

      {/* Notification bell */}
      <button
        className="relative w-8 h-8 flex items-center justify-center rounded-xl transition-all"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(124,58,237,0.1)' }}
      >
        <Bell size={15} style={{ color: 'rgba(148,163,184,0.7)' }} />
        {stats.overduePayments > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: '#f43f5e' }} />
        )}
      </button>

      {/* Avatar */}
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-xs cursor-pointer shadow-lg"
        style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}
        title={user?.name}
      >
        {user?.name?.charAt(0) || 'A'}
      </div>
    </header>
  );
}
