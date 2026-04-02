'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Client, Project, Contract, Payment, Message } from '../data/seed';

interface CRMUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarColor: string;
}

interface CRMContextType {
  // Auth
  user: CRMUser | null;
  isAuthenticated: boolean;
  authLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;

  // Data
  clients: Client[];
  projects: Project[];
  contracts: Contract[];
  payments: Payment[];
  messages: Message[];
  loading: boolean;

  // Actions
  updateProjectStatus: (projectId: string, status: Project['status']) => void;
  sendMessage: (subject: string, body: string, toId?: string) => void;
  markMessageRead: (messageId: string) => void;
  toggleMessageStar: (messageId: string) => void;

  // Stats
  stats: {
    totalClients: number;
    activeProjects: number;
    totalRevenue: number;
    pendingPayments: number;
    overduePayments: number;
    unreadMessages: number;
  };
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export function CRMProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CRMUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('crm_user') : null;
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch {}
    }
    setAuthLoading(false);
  }, []);

  // Load data once authenticated
  useEffect(() => {
    if (!user) { setLoading(false); return; }
    setLoading(true);
    Promise.all([
      fetch('/api/crm/clients').then(r => r.json()),
      fetch('/api/crm/projects').then(r => r.json()),
      fetch('/api/crm/contracts').then(r => r.json()),
      fetch('/api/crm/payments').then(r => r.json()),
      fetch('/api/crm/messages').then(r => r.json()),
    ]).then(([c, p, ct, pay, msg]) => {
      setClients(c);
      setProjects(p);
      setContracts(ct);
      setPayments(pay);
      setMessages(msg);
    }).finally(() => setLoading(false));
  }, [user]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch('/api/crm/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.success) {
      const u: CRMUser = data.user;
      setUser(u);
      localStorage.setItem('crm_user', JSON.stringify(u));
      return { success: true };
    }
    return { success: false, error: data.error };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('crm_user');
  }, []);

  const updateProjectStatus = useCallback((projectId: string, status: Project['status']) => {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, status, progress: status === 'completed' ? 100 : p.progress } : p));
  }, []);

  const sendMessage = useCallback((subject: string, body: string, toId: string = 'c1') => {
    const newMsg: Message = {
      id: `m${Date.now()}`,
      fromId: 'admin',
      fromName: user?.name || 'Admin',
      fromAvatar: '#6366f1',
      toId,
      subject,
      body,
      timestamp: new Date().toISOString(),
      read: true,
      starred: false,
    };
    setMessages(prev => [newMsg, ...prev]);
  }, [user]);

  const markMessageRead = useCallback((messageId: string) => {
    setMessages(prev => prev.map(m => m.id === messageId ? { ...m, read: true } : m));
  }, []);

  const toggleMessageStar = useCallback((messageId: string) => {
    setMessages(prev => prev.map(m => m.id === messageId ? { ...m, starred: !m.starred } : m));
  }, []);

  const stats = {
    totalClients: clients.filter(c => c.status !== 'lead').length,
    activeProjects: projects.filter(p => p.status === 'active').length,
    totalRevenue: clients.reduce((sum, c) => sum + c.revenue, 0),
    pendingPayments: payments.filter(p => p.status === 'pending').length,
    overduePayments: payments.filter(p => p.status === 'overdue').length,
    unreadMessages: messages.filter(m => !m.read).length,
  };

  return (
    <CRMContext.Provider value={{
      user, isAuthenticated: !!user, authLoading,
      login, logout,
      clients, projects, contracts, payments, messages, loading,
      updateProjectStatus, sendMessage, markMessageRead, toggleMessageStar,
      stats,
    }}>
      {children}
    </CRMContext.Provider>
  );
}

export function useCRM() {
  const ctx = useContext(CRMContext);
  if (!ctx) throw new Error('useCRM must be used inside CRMProvider');
  return ctx;
}
