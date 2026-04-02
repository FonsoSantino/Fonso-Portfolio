'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCRM } from '../context/CRMContext';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';
import { StatusBadge } from '../components/StatusBadge';
import { EmptyState } from '../components/EmptyState';
import { FileText, CalendarDays } from 'lucide-react';

const CONTRACT_FILTERS = ['all', 'active', 'draft', 'expired', 'terminated'];

export default function ContractsPage() {
  const { isAuthenticated, authLoading, contracts, clients, loading } = useCRM();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.replace('/crm/login');
  }, [isAuthenticated, authLoading, router]);

  if (authLoading || !isAuthenticated) return null;

  const filtered = contracts.filter(c => {
    const client = clients.find(cl => cl.id === c.clientId);
    const matchSearch = !search || [c.title, client?.company || '', client?.name || ''].some(v =>
      v.toLowerCase().includes(search.toLowerCase())
    );
    return matchSearch && (filter === 'all' || c.status === filter);
  });

  const totalActive = contracts.filter(c => c.status === 'active').reduce((s, c) => s + c.value, 0);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar
          title="Contracts"
          subtitle={`$${totalActive.toLocaleString()} active contract value`}
          onSearch={setSearch}
          searchPlaceholder="Search contracts..."
        />
        <main className="flex-1 overflow-y-auto p-6">
          {/* Filter tabs */}
          <div className="flex items-center gap-1 mb-6 bg-white/[0.03] border border-white/[0.07] rounded-xl p-1 w-fit flex-wrap">
            {CONTRACT_FILTERS.map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                  filter === s ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                {s === 'all' ? `All (${contracts.length})` : `${s} (${contracts.filter(c => c.status === s).length})`}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-20 bg-white/[0.03] rounded-xl animate-pulse" />)}</div>
          ) : filtered.length === 0 ? (
            <EmptyState icon={<FileText size={28} />} title="No contracts found" />
          ) : (
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Contract</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">Client</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">Type</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">Duration</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Value</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filtered.map(contract => {
                    const client = clients.find(c => c.id === contract.clientId);
                    return (
                      <tr key={contract.id} className="hover:bg-white/[0.02] transition-all">
                        <td className="px-5 py-4">
                          <p className="font-medium text-white">{contract.title}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{contract.id.toUpperCase()}</p>
                        </td>
                        <td className="px-5 py-4 text-slate-300 hidden md:table-cell">
                          {client ? (
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: client.avatarColor }}>
                                {client.name.charAt(0)}
                              </div>
                              {client.company}
                            </div>
                          ) : '—'}
                        </td>
                        <td className="px-5 py-4 text-slate-400 text-xs hidden lg:table-cell">
                          <span className="px-2 py-0.5 bg-white/5 rounded-md">{contract.type}</span>
                        </td>
                        <td className="px-5 py-4 hidden lg:table-cell">
                          <div className="flex items-center gap-1 text-xs text-slate-400">
                            <CalendarDays size={12} />
                            {new Date(contract.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} →{' '}
                            {new Date(contract.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-white font-semibold">${contract.value.toLocaleString()}</span>
                        </td>
                        <td className="px-5 py-4">
                          <StatusBadge status={contract.status} />
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
