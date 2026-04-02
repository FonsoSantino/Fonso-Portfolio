'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCRM } from '../context/CRMContext';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';
import { StatusBadge } from '../components/StatusBadge';
import { EmptyState } from '../components/EmptyState';
import { Users, ChevronRight, MapPin, Building2 } from 'lucide-react';
import Link from 'next/link';
import type { Client } from '../data/seed';

const STATUSES = ['all', 'active', 'inactive', 'lead'] as const;

export default function ClientsPage() {
  const { isAuthenticated, authLoading, clients, loading } = useCRM();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.replace('/crm/login');
  }, [isAuthenticated, authLoading, router]);

  if (authLoading || !isAuthenticated) return null;

  const filtered = clients.filter(c => {
    const matchSearch = !search || [c.name, c.company, c.email, c.country].some(v =>
      v.toLowerCase().includes(search.toLowerCase())
    );
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar
          title="Clients"
          subtitle={`${clients.length} total accounts`}
          onSearch={setSearch}
          searchPlaceholder="Search clients..."
        />
        <main className="flex-1 overflow-y-auto p-6">
          {/* Filter tabs */}
          <div className="flex items-center gap-1 mb-6 bg-white/[0.03] border border-white/[0.07] rounded-xl p-1 w-fit">
            {STATUSES.map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                  statusFilter === s
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {s === 'all' ? `All (${clients.length})` : `${s.charAt(0).toUpperCase() + s.slice(1)} (${clients.filter(c => c.status === s).length})`}
              </button>
            ))}
          </div>

          {/* Table */}
          {loading ? (
            <div className="space-y-3">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-16 bg-white/[0.03] rounded-xl animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState icon={<Users size={28} />} title="No clients found" description="Try adjusting your search or filters." />
          ) : (
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Client</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">Company</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">Location</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">Revenue</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filtered.map(client => (
                    <tr
                      key={client.id}
                      className="hover:bg-white/[0.03] transition-all group cursor-pointer"
                      onClick={() => router.push(`/crm/clients/${client.id}`)}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                            style={{ backgroundColor: client.avatarColor }}
                          >
                            {client.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-white group-hover:text-indigo-300 transition-colors">{client.name}</p>
                            <p className="text-xs text-slate-400">{client.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-slate-300 hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <Building2 size={14} className="text-slate-500" />
                          {client.company}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-slate-400 hidden lg:table-cell">
                        <div className="flex items-center gap-1">
                          <MapPin size={12} />
                          {client.country}
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden lg:table-cell">
                        <span className="text-white font-medium">
                          {client.revenue > 0 ? `$${client.revenue.toLocaleString()}` : '—'}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={client.status} />
                      </td>
                      <td className="px-5 py-4">
                        <ChevronRight size={16} className="text-slate-600 group-hover:text-slate-300 transition-colors ml-auto" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
