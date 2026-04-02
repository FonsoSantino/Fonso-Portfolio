'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useCRM } from '../context/CRMContext';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';
import { EmptyState } from '../components/EmptyState';
import { MessageSquare, Star, Send, X, Check } from 'lucide-react';

export default function MessagesPage() {
  const { isAuthenticated, authLoading, messages, loading, sendMessage, markMessageRead, toggleMessageStar } = useCRM();
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [composing, setComposing] = useState(false);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.replace('/crm/login');
  }, [isAuthenticated, authLoading, router]);

  if (authLoading || !isAuthenticated) return null;

  const selectedMsg = messages.find(m => m.id === selected);

  const handleSelect = (id: string) => {
    setSelected(id);
    markMessageRead(id);
    setComposing(false);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !body.trim()) return;
    sendMessage(subject, body);
    setSent(true);
    setSubject('');
    setBody('');
    setTimeout(() => { setComposing(false); setSent(false); }, 1500);
  };

  const unread = messages.filter(m => !m.read).length;
  const starred = messages.filter(m => m.starred);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar
          title="Messages"
          subtitle={`${unread} unread`}
          actions={
            <button
              onClick={() => { setComposing(true); setSelected(null); }}
              className="flex items-center gap-2 text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-3 py-1.5 transition-all"
            >
              <Send size={13} /> Compose
            </button>
          }
        />
        <main className="flex-1 overflow-hidden flex">
          {/* Message list */}
          <div className="w-80 flex-shrink-0 border-r border-white/[0.06] overflow-y-auto bg-[#0a1120]">
            {loading ? (
              <div className="p-3 space-y-2">
                {[...Array(5)].map((_, i) => <div key={i} className="h-20 bg-white/[0.03] rounded-xl animate-pulse" />)}
              </div>
            ) : messages.length === 0 ? (
              <div className="p-6">
                <EmptyState icon={<MessageSquare size={24} />} title="No messages" />
              </div>
            ) : (
              <div className="divide-y divide-white/[0.04]">
                {messages.map(msg => (
                  <button
                    key={msg.id}
                    onClick={() => handleSelect(msg.id)}
                    className={`w-full text-left px-4 py-4 hover:bg-white/[0.04] transition-all ${selected === msg.id ? 'bg-indigo-600/10 border-l-2 border-indigo-500' : 'border-l-2 border-transparent'}`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: msg.fromAvatar }}
                      >
                        {msg.fromName.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className={`text-sm truncate ${!msg.read ? 'font-semibold text-white' : 'font-medium text-slate-300'}`}>
                            {msg.fromName}
                          </p>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            {msg.starred && <Star size={10} className="text-amber-400 fill-amber-400" />}
                            {!msg.read && <span className="w-2 h-2 bg-indigo-500 rounded-full" />}
                          </div>
                        </div>
                        <p className={`text-xs truncate mt-0.5 ${!msg.read ? 'text-slate-200' : 'text-slate-400'}`}>{msg.subject}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          {new Date(msg.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Detail / Compose pane */}
          <div className="flex-1 overflow-y-auto">
            {composing ? (
              <div className="h-full flex flex-col p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-base font-semibold text-white">New Message</h2>
                  <button onClick={() => setComposing(false)} className="text-slate-400 hover:text-white transition-colors">
                    <X size={18} />
                  </button>
                </div>
                <form onSubmit={handleSend} className="flex flex-col gap-4 flex-1">
                  <div>
                    <label className="text-xs text-slate-400 uppercase tracking-wider">Subject</label>
                    <input
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      required
                      placeholder="Message subject..."
                      className="mt-1.5 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <label className="text-xs text-slate-400 uppercase tracking-wider">Body</label>
                    <textarea
                      value={body}
                      onChange={e => setBody(e.target.value)}
                      required
                      placeholder="Write your message..."
                      className="mt-1.5 flex-1 min-h-[200px] w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all resize-none"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl px-6 py-2.5 transition-all"
                    >
                      {sent ? <><Check size={15} /> Sent!</> : <><Send size={15} /> Send Message</>}
                    </button>
                  </div>
                </form>
              </div>
            ) : selectedMsg ? (
              <div className="p-8">
                <div className="flex items-start justify-between mb-6 gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-white">{selectedMsg.subject}</h2>
                    <div className="flex items-center gap-3 mt-2 text-sm text-slate-400">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: selectedMsg.fromAvatar }}>
                          {selectedMsg.fromName.charAt(0)}
                        </div>
                        {selectedMsg.fromName}
                      </div>
                      <span>·</span>
                      <span>{new Date(selectedMsg.timestamp).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleMessageStar(selectedMsg.id)}
                    className="text-slate-500 hover:text-amber-400 transition-colors mt-1"
                    title={selectedMsg.starred ? 'Unstar' : 'Star'}
                  >
                    <Star size={18} className={selectedMsg.starred ? 'fill-amber-400 text-amber-400' : ''} />
                  </button>
                </div>
                <div className="h-px bg-white/[0.06] mb-6" />
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{selectedMsg.body}</p>
                <div className="mt-8">
                  <button
                    onClick={() => { setComposing(true); setSelected(null); setSubject(`Re: ${selectedMsg.subject}`); }}
                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium rounded-xl px-5 py-2.5 transition-all"
                  >
                    <Send size={14} /> Reply
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <EmptyState
                  icon={<MessageSquare size={32} />}
                  title="Select a message"
                  description="Choose a message from the list or compose a new one."
                  action={
                    <button
                      onClick={() => setComposing(true)}
                      className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl px-5 py-2.5 transition-all"
                    >
                      <Send size={14} /> Compose
                    </button>
                  }
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
