'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCRM } from '../context/CRMContext';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';
import { StatCard } from '../components/StatCard';
import { StatusBadge } from '../components/StatusBadge';
import {
  Users, FolderKanban, DollarSign, CreditCard,
  ArrowRight, AlertTriangle, TrendingUp, Activity,
} from 'lucide-react';
import Link from 'next/link';

const fmt = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` :
  n >= 1_000 ? `$${(n / 1_000).toFixed(0)}K` : `$${n}`;

const panelStyle = {
  background: 'rgba(255,255,255,0.025)',
  border: '1px solid rgba(124,58,237,0.1)',
  borderRadius: '16px',
  overflow: 'hidden' as const,
};

const headerStyle = {
  padding: '16px 20px',
  borderBottom: '1px solid rgba(124,58,237,0.08)',
  display: 'flex' as const,
  alignItems: 'center' as const,
  justifyContent: 'space-between' as const,
};

export default function DashboardPage() {
  const { isAuthenticated, authLoading, stats, clients, projects, payments, loading, messages } = useCRM();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.replace('/crm/login');
  }, [isAuthenticated, authLoading, router]);

  if (authLoading || !isAuthenticated) return null;

  const recentClients = clients.slice(0, 5);
  const activeProjects = projects.filter(p => p.status === 'active').slice(0, 5);
  const overduePayments = payments.filter(p => p.status === 'overdue');
  const unreadMessages = messages.filter(m => !m.read);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#090712' }}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar
          title="Dashboard"
          subtitle={new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        />
        <main className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Welcome banner */}
          <div
            className="rounded-2xl p-5 flex items-center justify-between"
            style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(79,70,229,0.08) 100%)',
              border: '1px solid rgba(124,58,237,0.2)',
            }}
          >
            <div>
              <p className="text-white font-semibold text-base">Welcome to ClientOS</p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(148,163,184,0.7)' }}>
                Nexora Systems · {clients.length} clients · {projects.length} projects
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: '#34d399', boxShadow: '0 0 6px #34d399' }}
              />
              <span className="text-xs font-medium" style={{ color: '#34d399' }}>All Systems Operational</span>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Clients"
              value={loading ? '—' : stats.totalClients}
              subtitle="Active accounts"
              icon={<Users size={17} />}
              color="#7c3aed"
              trend={8}
              loading={loading}
            />
            <StatCard
              title="Active Projects"
              value={loading ? '—' : stats.activeProjects}
              subtitle="In progress"
              icon={<FolderKanban size={17} />}
              color="#10b981"
              trend={12}
              loading={loading}
            />
            <StatCard
              title="Total Revenue"
              value={loading ? '—' : fmt(stats.totalRevenue)}
              subtitle="Lifetime value"
              icon={<DollarSign size={17} />}
              color="#f59e0b"
              trend={5}
              loading={loading}
            />
            <StatCard
              title="Overdue"
              value={loading ? '—' : stats.overduePayments}
              subtitle={`${stats.pendingPayments} pending`}
              icon={<CreditCard size={17} />}
              color={stats.overduePayments > 0 ? '#f43f5e' : '#7c3aed'}
              trend={-3}
              loading={loading}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Recent Clients */}
            <div style={panelStyle}>
              <div style={headerStyle}>
                <div className="flex items-center gap-2">
                  <Users size={14} style={{ color: '#7c3aed' }} />
                  <span className="text-sm font-semibold text-white">Recent Clients</span>
                </div>
                <Link
                  href="/crm/clients"
                  className="flex items-center gap-1 text-xs font-medium transition-colors"
                  style={{ color: '#7c3aed' }}
                >
                  View all <ArrowRight size={11} />
                </Link>
              </div>
              <div>
                {recentClients.map((client, i) => (
                  <Link
                    key={client.id}
                    href={`/crm/clients/${client.id}`}
                    className="flex items-center gap-3 px-5 py-3 transition-all group"
                    style={{ borderBottom: i < recentClients.length - 1 ? '1px solid rgba(124,58,237,0.05)' : 'none' }}
                  >
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                      style={{ background: client.avatarColor }}
                    >
                      {client.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate group-hover:text-violet-300 transition-colors">{client.name}</p>
                      <p className="text-xs truncate" style={{ color: 'rgba(100,116,139,0.7)' }}>{client.company}</p>
                    </div>
                    <StatusBadge status={client.status} size="sm" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Active Projects */}
            <div className="lg:col-span-2" style={panelStyle}>
              <div style={headerStyle}>
                <div className="flex items-center gap-2">
                  <Activity size={14} style={{ color: '#10b981' }} />
                  <span className="text-sm font-semibold text-white">Active Projects</span>
                </div>
                <Link
                  href="/crm/projects"
                  className="flex items-center gap-1 text-xs font-medium transition-colors"
                  style={{ color: '#7c3aed' }}
                >
                  View all <ArrowRight size={11} />
                </Link>
              </div>
              <div>
                {activeProjects.map((project, i) => {
                  const client = clients.find(c => c.id === project.clientId);
                  return (
                    <div
                      key={project.id}
                      className="px-5 py-4"
                      style={{ borderBottom: i < activeProjects.length - 1 ? '1px solid rgba(124,58,237,0.05)' : 'none' }}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2.5">
                        <div>
                          <p className="text-sm font-medium text-white">{project.name}</p>
                          <p className="text-xs mt-0.5" style={{ color: 'rgba(100,116,139,0.7)' }}>{client?.company}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs font-semibold" style={{ color: '#a78bfa' }}>{project.progress}%</span>
                          <StatusBadge status={project.status} size="sm" />
                        </div>
                      </div>
                      <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${project.progress}%`,
                            background: project.progress === 100
                              ? '#34d399'
                              : 'linear-gradient(90deg, #7c3aed, #a78bfa)',
                            boxShadow: '0 0 8px rgba(124,58,237,0.4)',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Overdue alert */}
          {overduePayments.length > 0 && (
            <div
              className="rounded-2xl p-5"
              style={{
                background: 'rgba(244,63,94,0.06)',
                border: '1px solid rgba(244,63,94,0.18)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={15} style={{ color: '#f87171' }} />
                <h3 className="text-sm font-semibold" style={{ color: '#f87171' }}>
                  {overduePayments.length} Overdue Payment{overduePayments.length > 1 ? 's' : ''}
                </h3>
              </div>
              <div className="space-y-1.5">
                {overduePayments.map(p => {
                  const client = clients.find(c => c.id === p.clientId);
                  return (
                    <div key={p.id} className="flex items-center justify-between text-sm">
                      <span style={{ color: 'rgba(226,232,240,0.7)' }}>{client?.name} — {p.description}</span>
                      <span className="font-semibold" style={{ color: '#f87171' }}>${p.amount.toLocaleString()}</span>
                    </div>
                  );
                })}
              </div>
              <Link href="/crm/payments" className="mt-3 inline-flex items-center gap-1 text-xs transition-colors" style={{ color: '#f87171' }}>
                Manage payments <ArrowRight size={11} />
              </Link>
            </div>
          )}

          {/* Unread messages hint */}
          {unreadMessages.length > 0 && (
            <div
              className="rounded-2xl p-4 flex items-center justify-between"
              style={{
                background: 'rgba(124,58,237,0.06)',
                border: '1px solid rgba(124,58,237,0.15)',
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(124,58,237,0.15)', color: '#a78bfa' }}>
                  <TrendingUp size={15} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{unreadMessages.length} unread message{unreadMessages.length > 1 ? 's' : ''}</p>
                  <p className="text-xs" style={{ color: 'rgba(100,116,139,0.7)' }}>From: {unreadMessages.map(m => m.fromName).join(', ')}</p>
                </div>
              </div>
              <Link
                href="/crm/messages"
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
                style={{ background: 'rgba(124,58,237,0.15)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.2)' }}
              >
                View <ArrowRight size={11} />
              </Link>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
