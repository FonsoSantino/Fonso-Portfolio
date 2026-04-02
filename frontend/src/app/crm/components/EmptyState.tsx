'use client';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500">
        {icon}
      </div>
      <div>
        <p className="text-white font-semibold">{title}</p>
        {description && <p className="text-sm text-slate-400 mt-1 max-w-xs">{description}</p>}
      </div>
      {action}
    </div>
  );
}
