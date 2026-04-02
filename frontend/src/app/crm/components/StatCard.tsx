'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: number;
  color?: string;
  loading?: boolean;
}

export function StatCard({ title, value, subtitle, icon, trend, color = '#7c3aed', loading }: StatCardProps) {
  const trendPositive = trend !== undefined && trend > 0;
  const trendNegative = trend !== undefined && trend < 0;

  return (
    <div
      className="relative flex flex-col gap-4 p-5 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 group"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(124,58,237,0.12)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
      }}
    >
      {/* Glow bg */}
      <div
        className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"
        style={{ background: color }}
      />

      <div className="flex items-start justify-between relative z-10">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: `${color}18`, color, border: `1px solid ${color}25` }}
        >
          {icon}
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-semibold ${trendPositive ? 'text-emerald-400' : trendNegative ? 'text-rose-400' : 'text-slate-400'}`}>
            {trendPositive ? <TrendingUp size={11} /> : trendNegative ? <TrendingDown size={11} /> : <Minus size={11} />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>

      {loading ? (
        <div className="space-y-2 relative z-10">
          <div className="h-7 w-24 rounded-lg animate-pulse" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <div className="h-3 w-16 rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.04)' }} />
        </div>
      ) : (
        <div className="relative z-10">
          <p className="text-2xl font-bold text-white leading-none tracking-tight">{value}</p>
          <p className="text-xs mt-1.5 font-medium" style={{ color: 'rgba(100,116,139,0.8)' }}>{subtitle || title}</p>
        </div>
      )}

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />
    </div>
  );
}
