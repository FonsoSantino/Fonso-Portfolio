'use client';

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  active:      { label: 'Active',      color: '#34d399', bg: 'rgba(52,211,153,0.12)',  border: 'rgba(52,211,153,0.2)' },
  inactive:    { label: 'Inactive',    color: '#94a3b8', bg: 'rgba(148,163,184,0.1)', border: 'rgba(148,163,184,0.15)' },
  lead:        { label: 'Lead',        color: '#fb923c', bg: 'rgba(251,146,60,0.12)',  border: 'rgba(251,146,60,0.2)' },
  pending:     { label: 'Pending',     color: '#fbbf24', bg: 'rgba(251,191,36,0.12)',  border: 'rgba(251,191,36,0.2)' },
  // completed → violet (Fonso Dev primary)
  completed:   { label: 'Completed',   color: '#a78bfa', bg: 'rgba(167,139,250,0.15)', border: 'rgba(167,139,250,0.25)' },
  paused:      { label: 'Paused',      color: '#94a3b8', bg: 'rgba(148,163,184,0.1)', border: 'rgba(148,163,184,0.15)' },
  expired:     { label: 'Expired',     color: '#f87171', bg: 'rgba(248,113,113,0.12)', border: 'rgba(248,113,113,0.2)' },
  draft:       { label: 'Draft',       color: '#94a3b8', bg: 'rgba(148,163,184,0.08)', border: 'rgba(148,163,184,0.12)' },
  terminated:  { label: 'Terminated',  color: '#f87171', bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.18)' },
  paid:        { label: 'Paid',        color: '#34d399', bg: 'rgba(52,211,153,0.12)',  border: 'rgba(52,211,153,0.2)' },
  overdue:     { label: 'Overdue',     color: '#f87171', bg: 'rgba(248,113,113,0.12)', border: 'rgba(248,113,113,0.2)' },
  refunded:    { label: 'Refunded',    color: '#a78bfa', bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.2)' },
};

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const cfg = STATUS_CONFIG[status] || { label: status, color: '#94a3b8', bg: 'rgba(148,163,184,0.1)', border: 'rgba(148,163,184,0.15)' };
  const cls = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${cls}`}
      style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cfg.color }} />
      {cfg.label}
    </span>
  );
}
