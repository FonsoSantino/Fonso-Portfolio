'use client';

import { CRMProvider } from './context/CRMContext';

export default function CRMLayout({ children }: { children: React.ReactNode }) {
  return (
    <CRMProvider>
      <style>{`
        .crm-root * { box-sizing: border-box; }
        .crm-root ::-webkit-scrollbar { width: 4px; height: 4px; }
        .crm-root ::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        .crm-root ::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.25); border-radius: 2px; }
        .crm-root ::-webkit-scrollbar-thumb:hover { background: rgba(124,58,237,0.45); }
        .crm-table-row:hover { background: rgba(124,58,237,0.04); }
      `}</style>
      <div
        className="crm-root min-h-screen text-white"
        style={{
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          background: '#090712',
        }}
      >
        {children}
      </div>
    </CRMProvider>
  );
}
