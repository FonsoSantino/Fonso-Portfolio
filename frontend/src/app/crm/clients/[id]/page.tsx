'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useCRM } from '../../context/CRMContext';
import { Sidebar } from '../../components/Sidebar';
import { Topbar } from '../../components/Topbar';
import { StatusBadge } from '../../components/StatusBadge';
import {
  ArrowLeft, Mail, Phone, Globe, Building2,
  CalendarDays, DollarSign, FolderKanban, FileText, CreditCard
} from 'lucide-react';
import Link from 'next/link';

export default function ClientDetailPage() {
  const { isAuthenticated, authLoading, clients, projects, contracts, payments, loading } = useCRM();
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.replace('/crm/login');
  }, [isAuthenticated, authLoading, router]);

  if (authLoading || !isAuthenticated) return null;

  const client = clients.find(c => c.id === id);
  if (!loading && !client) {
    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-white font-semibold">Client not found</p>
            <Link href="/crm/clients" className="text-indigo-400 text-sm mt-2 inline-block">← Back to clients</Link>
          </div>
        </div>
      </div>
    );
  }

  const clientProjects = projects.filter(p => p.clientId === id);
  const clientContracts = contracts.filter(c => c.clientId === id);
  const clientPayments = payments.filter(p => p.clientId === id);
  const totalPaid = clientPayments.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar
          title={client?.name || 'Client Detail'}
          subtitle={client?.company}
          actions={
            <Link
              href="/crm/clients"
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 transition-all"
            >
              <ArrowLeft size={13} /> Back
            </Link>
          }
        />
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => <div key={i} className="h-32 bg-white/[0.03] rounded-xl animate-pulse" />)}
            </div>
          ) : client ? (
            <>
              {/* Profile header */}
              <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-6 flex flex-col sm:flex-row gap-5">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl flex-shrink-0"
                  style={{ backgroundColor: client.avatarColor }}
                >
                  {client.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3 flex-wrap">
                    <div>
                      <h2 className="text-xl font-bold text-white">{client.name}</h2>
                      <p className="text-slate-400 text-sm mt-0.5">{client.industry} · {client.company}</p>
                    </div>
                    <StatusBadge status={client.status} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                    <a href={`mailto:${client.email}`} className="flex items-center gap-2 text-sm text-slate-300 hover:text-indigo-400 transition-colors">
                      <Mail size={14} className="text-slate-500" /> {client.email}
                    </a>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Phone size={14} className="text-slate-500" /> {client.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Globe size={14} className="text-slate-500" /> {client.country}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col gap-4 sm:text-right">
                  <div>
                    <p className="text-xs text-slate-400">Total Revenue</p>
                    <p className="text-xl font-bold text-white">${client.revenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Client since</p>
                    <p className="text-sm text-white">{new Date(client.joinedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Projects', value: clientProjects.length, icon: <FolderKanban size={16} />, color: '#6366f1' },
                  { label: 'Contracts', value: clientContracts.length, icon: <FileText size={16} />, color: '#10b981' },
                  { label: 'Paid', value: `$${totalPaid.toLocaleString()}`, icon: <CreditCard size={16} />, color: '#f59e0b' },
                ].map(s => (
                  <div key={s.label} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}22`, color: s.color }}>
                      {s.icon}
                    </div>
                    <div>
                      <p className="text-lg font-bold text-white">{s.value}</p>
                      <p className="text-xs text-slate-400">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Projects */}
              <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-white/[0.06]">
                  <h3 className="text-sm font-semibold text-white">Projects</h3>
                </div>
                {clientProjects.length === 0 ? (
                  <p className="text-slate-400 text-sm px-5 py-8 text-center">No projects for this client.</p>
                ) : (
                  <div className="divide-y divide-white/[0.04]">
                    {clientProjects.map(project => (
                      <div key={project.id} className="px-5 py-4 flex items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white">{project.name}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{project.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex-1 max-w-[180px] h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full rounded-full bg-indigo-500" style={{ width: `${project.progress}%` }} />
                            </div>
                            <span className="text-xs text-slate-400">{project.progress}%</span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 space-y-1">
                          <StatusBadge status={project.status} size="sm" />
                          <p className="text-xs text-slate-400">${project.budget.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Payments */}
              <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-white/[0.06]">
                  <h3 className="text-sm font-semibold text-white">Payment History</h3>
                </div>
                <div className="divide-y divide-white/[0.04]">
                  {clientPayments.map(pay => (
                    <div key={pay.id} className="px-5 py-3 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-sm text-white truncate">{pay.description}</p>
                        <p className="text-xs text-slate-400">{pay.invoiceNumber} · Due {new Date(pay.dueDate).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-white font-medium">${pay.amount.toLocaleString()} {pay.currency}</span>
                        <StatusBadge status={pay.status} size="sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </main>
      </div>
    </div>
  );
}
