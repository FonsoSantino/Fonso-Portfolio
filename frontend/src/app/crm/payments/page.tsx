'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCRM } from '../context/CRMContext';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';
import { StatusBadge } from '../components/StatusBadge';
import { StatCard } from '../components/StatCard';
import { EmptyState } from '../components/EmptyState';
import { CreditCard, DollarSign, AlertTriangle, Clock, CheckCircle } from 'lucide-react';

const PAY_FILTERS = ['all', 'paid', 'pending', 'overdue'];

export default function PaymentsPage() {
  const { isAuthenticated, authLoading, payments, clients, loading } = useCRM();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.replace('/crm/login');
  }, [isAuthenticated, authLoading, router]);

  if (authLoading || !isAuthenticated) return null;

  const filtered = payments.filter(p => {
    const client = clients.find(c => c.id === p.clientId);
    const matchSearch = !search || [p.description, p.invoiceNumber, client?.name || '', client?.company || ''].some(v =>
      v.toLowerCase().includes(search.toLowerCase())
    );
    return matchSearch && (filter === 'all' || p.status === filter);
  });

  const totalPaid = payments.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'pending').reduce((s, p) => s + p.amount, 0);
  const totalOverdue = payments.filter(p => p.status === 'overdue').reduce((s, p) => s + p.amount, 0);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar
          title="Payments"
          subtitle={`$${totalPaid.toLocaleString()} collected`}
          onSearch={setSearch}
          searchPlaceholder="Search invoices..."
        />
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Summary cards */}
          <div className="grid grid-cols-3 gap-4">
            <StatCard title="Collected" value={`$${totalPaid.toLocaleString()}`} subtitle={`${payments.filter(p => p.status === 'paid').length} invoices`} icon={<CheckCircle size={16} />} color="#34d399" loading={loading} />
            <StatCard title="Pending" value={`$${totalPending.toLocaleString()}`} subtitle={`${payments.filter(p => p.status === 'pending').length} invoices`} icon={<Clock size={16} />} color="#fbbf24" loading={loading} />
            <StatCard title="Overdue" value={`$${totalOverdue.toLocaleString()}`} subtitle={`${payments.filter(p => p.status === 'overdue').length} invoices`} icon={<AlertTriangle size={16} />} color="#f87171" loading={loading} />
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 bg-white/[0.03] border border-white/[0.07] rounded-xl p-1 w-fit">
            {PAY_FILTERS.map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                  filter === s ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                {s === 'all' ? `All (${payments.length})` : `${s} (${payments.filter(p => p.status === s).length})`}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="space-y-3">{[...Array(6)].map((_, i) => <div key={i} className="h-16 bg-white/[0.03] rounded-xl animate-pulse" />)}</div>
          ) : filtered.length === 0 ? (
            <EmptyState icon={<CreditCard size={28} />} title="No payments found" />
          ) : (
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Invoice</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">Client</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">Due Date</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Amount</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filtered.map(pay => {
                    const client = clients.find(c => c.id === pay.clientId);
                    const isOverdue = pay.status === 'overdue';
                    return (
                      <tr key={pay.id} className={`hover:bg-white/[0.02] transition-all ${isOverdue ? 'bg-red-500/[0.03]' : ''}`}>
                        <td className="px-5 py-4">
                          <p className="font-medium text-white">{pay.description}</p>
                          <p className="text-xs text-slate-400 mt-0.5 font-mono">{pay.invoiceNumber}</p>
                        </td>
                        <td className="px-5 py-4 text-slate-300 hidden md:table-cell">
                          {client ? (
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: client.avatarColor }}>
                                {client.name.charAt(0)}
                              </div>
                              {client.name}
                            </div>
                          ) : '—'}
                        </td>
                        <td className={`px-5 py-4 text-xs hidden lg:table-cell ${isOverdue ? 'text-red-400 font-medium' : 'text-slate-400'}`}>
                          {new Date(pay.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td className="px-5 py-4">
                          <span className={`font-semibold ${isOverdue ? 'text-red-400' : 'text-white'}`}>
                            ${pay.amount.toLocaleString()} <span className="text-xs font-normal text-slate-400">{pay.currency}</span>
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <StatusBadge status={pay.status} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
