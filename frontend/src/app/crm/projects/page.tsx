'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCRM } from '../context/CRMContext';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';
import { StatusBadge } from '../components/StatusBadge';
import { EmptyState } from '../components/EmptyState';
import { FolderKanban, ChevronDown, Check } from 'lucide-react';
import type { Project } from '../data/seed';

const STATUSES: Project['status'][] = ['pending', 'active', 'completed', 'paused'];
const STATUS_FILTERS = ['all', 'pending', 'active', 'completed', 'paused'];

export default function ProjectsPage() {
  const { isAuthenticated, authLoading, projects, clients, loading, updateProjectStatus } = useCRM();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.replace('/crm/login');
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    const close = () => setOpenDropdown(null);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  if (authLoading || !isAuthenticated) return null;

  const filtered = projects.filter(p => {
    const client = clients.find(c => c.id === p.clientId);
    const matchSearch = !search || [p.name, client?.company || '', client?.name || ''].some(v =>
      v.toLowerCase().includes(search.toLowerCase())
    );
    const matchFilter = filter === 'all' || p.status === filter;
    return matchSearch && matchFilter;
  });

  const handleStatusChange = async (projectId: string, newStatus: Project['status']) => {
    setSaving(projectId);
    updateProjectStatus(projectId, newStatus);
    setOpenDropdown(null);
    setTimeout(() => setSaving(null), 500);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar
          title="Projects"
          subtitle={`${projects.length} total projects`}
          onSearch={setSearch}
          searchPlaceholder="Search projects..."
        />
        <main className="flex-1 overflow-y-auto p-6">
          {/* Filter tabs */}
          <div className="flex items-center gap-1 mb-6 bg-white/[0.03] border border-white/[0.07] rounded-xl p-1 w-fit flex-wrap">
            {STATUS_FILTERS.map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                  filter === s ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                {s === 'all' ? `All (${projects.length})` : `${s} (${projects.filter(p => p.status === s).length})`}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="space-y-3">{[...Array(6)].map((_, i) => <div key={i} className="h-20 bg-white/[0.03] rounded-xl animate-pulse" />)}</div>
          ) : filtered.length === 0 ? (
            <EmptyState icon={<FolderKanban size={28} />} title="No projects found" description="Try changing your search or filter." />
          ) : (
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl overflow-visible">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Project</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">Client</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">Progress</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">Budget</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filtered.map(project => {
                    const client = clients.find(c => c.id === project.clientId);
                    return (
                      <tr key={project.id} className="hover:bg-white/[0.02] transition-all">
                        <td className="px-5 py-4">
                          <p className="font-medium text-white">{project.name}</p>
                          <div className="flex gap-1.5 mt-1 flex-wrap">
                            {project.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-white/[0.07] text-slate-400 rounded-md">{tag}</span>
                            ))}
                          </div>
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
                        <td className="px-5 py-4 hidden lg:table-cell">
                          <div className="flex items-center gap-2 w-32">
                            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full rounded-full bg-indigo-500" style={{ width: `${project.progress}%` }} />
                            </div>
                            <span className="text-xs text-slate-400 w-7 text-right">{project.progress}%</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-white font-medium hidden lg:table-cell">
                          ${project.budget.toLocaleString()}
                        </td>
                        <td className="px-5 py-4">
                          {/* Inline status dropdown */}
                          <div className="relative" onClick={e => e.stopPropagation()}>
                            <button
                              onClick={() => setOpenDropdown(openDropdown === project.id ? null : project.id)}
                              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                            >
                              <StatusBadge status={saving === project.id ? '...' : project.status} size="sm" />
                              <ChevronDown size={12} className="text-slate-500" />
                            </button>
                            {openDropdown === project.id && (
                              <div className="absolute top-full left-0 mt-1 z-50 bg-[#1e2a3a] border border-white/10 rounded-xl shadow-2xl py-1 min-w-[130px]">
                                {STATUSES.map(s => (
                                  <button
                                    key={s}
                                    onClick={() => handleStatusChange(project.id, s)}
                                    className="flex items-center gap-2 w-full px-3 py-2 text-xs hover:bg-white/10 transition-all text-left capitalize"
                                  >
                                    {project.status === s && <Check size={10} className="text-indigo-400 flex-shrink-0" />}
                                    <span className={project.status === s ? 'text-indigo-300' : 'text-slate-300'}>{s}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
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
