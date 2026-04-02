'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCRM } from '../context/CRMContext';
import {
  LayoutDashboard, Users, FolderKanban, FileText,
  CreditCard, MessageSquare, LogOut,
  ChevronLeft, ChevronRight, ExternalLink, Menu, X
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/crm/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/crm/clients', icon: Users, label: 'Clients' },
  { href: '/crm/projects', icon: FolderKanban, label: 'Projects' },
  { href: '/crm/contracts', icon: FileText, label: 'Contracts' },
  { href: '/crm/payments', icon: CreditCard, label: 'Payments' },
  { href: '/crm/messages', icon: MessageSquare, label: 'Messages' },
];

// Nexora "NX" logomark — pure SVG, no external deps
function NexoraLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="url(#nx-grad)" />
      <path d="M8 24V8l8 8 8-8v16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="nx-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7c3aed" />
          <stop offset="1" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout, stats } = useCRM();

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-4 right-4 z-[70] p-2 rounded-xl backdrop-blur-md"
        style={{
            background: 'rgba(9, 7, 18, 0.8)',
            border: '1px solid rgba(124, 58, 237, 0.2)',
            color: 'white'
        }}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
            className="md:hidden fixed inset-0 z-[40] backdrop-blur-sm"
            style={{ background: 'rgba(0,0,0,0.6)' }}
            onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`flex-col flex-shrink-0 h-screen sticky top-0 transition-all duration-300 z-50 ${mobileOpen ? 'flex fixed left-0 shadow-2xl' : 'hidden md:flex'}`}
      style={{
        width: collapsed ? 72 : 248,
        background: 'rgba(9, 7, 18, 0.97)',
        borderRight: '1px solid rgba(124, 58, 237, 0.12)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-4 h-16" style={{ borderBottom: '1px solid rgba(124,58,237,0.10)' }}>
        <div className="flex-shrink-0">
          <NexoraLogo size={32} />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-sm font-bold text-white leading-none tracking-tight">Nexora Systems</p>
            <p className="text-[10px] mt-0.5 font-medium" style={{ color: '#7c3aed' }}>ClientOS · CRM Platform</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-5 px-2.5 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          const badge = label === 'Messages' && stats.unreadMessages > 0 ? stats.unreadMessages : null;
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative"
              style={active ? {
                background: 'rgba(124, 58, 237, 0.15)',
                color: '#a78bfa',
                border: '1px solid rgba(124,58,237,0.25)',
                boxShadow: '0 0 12px rgba(124,58,237,0.1)',
              } : {
                color: 'rgba(148,163,184,0.8)',
                border: '1px solid transparent',
              }}
            >
              <Icon size={17} className="flex-shrink-0 transition-transform group-hover:scale-110" />
              {!collapsed && <span className="truncate">{label}</span>}
              {badge && !collapsed && (
                <span className="ml-auto text-[10px] font-bold rounded-full px-1.5 py-0.5 min-w-[18px] text-center" style={{ background: '#7c3aed', color: 'white' }}>
                  {badge}
                </span>
              )}
              {badge && collapsed && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: '#7c3aed' }} />
              )}
              {collapsed && (
                <div className="absolute left-full ml-2.5 px-2.5 py-1.5 text-white text-xs rounded-lg font-medium opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl"
                  style={{ background: '#1a1030', border: '1px solid rgba(124,58,237,0.2)' }}>
                  {label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="mx-4 h-px" style={{ background: 'rgba(124,58,237,0.10)' }} />

      {/* Portfolio back link */}
      {!collapsed && (
        <div className="px-3 py-3">
          <Link
            href="/projects"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all"
            style={{ color: 'rgba(100,116,139,0.8)' }}
          >
            <ExternalLink size={12} />
            <span>Back to Portfolio</span>
          </Link>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mx-3 mb-2 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs transition-all"
        style={{ color: 'rgba(100,116,139,0.7)', background: 'rgba(255,255,255,0.03)' }}
      >
        {collapsed ? <ChevronRight size={15} /> : <><ChevronLeft size={15} /><span>Collapse</span></>}
      </button>

      {/* User footer */}
      <div className="p-3" style={{ borderTop: '1px solid rgba(124,58,237,0.10)' }}>
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center text-white font-bold text-xs shadow-lg"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}
          >
            {user?.name?.charAt(0) || 'A'}
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate leading-tight">{user?.name}</p>
                <p className="text-[10px] truncate" style={{ color: '#7c3aed' }}>{user?.role}</p>
              </div>
              <button
                onClick={logout}
                className="transition-colors p-1.5 rounded-lg hover:bg-white/5"
                style={{ color: 'rgba(100,116,139,0.6)' }}
                title="Logout"
              >
                <LogOut size={15} />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
    </>
  );
}
