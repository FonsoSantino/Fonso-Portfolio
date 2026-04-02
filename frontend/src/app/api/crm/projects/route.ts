import { NextResponse } from 'next/server';
import { PROJECTS } from '@/app/crm/data/seed';

// In-memory store so PATCH updates survive within the same process
let projectsStore = [...PROJECTS];

export async function GET() {
  return NextResponse.json(projectsStore);
}

export async function PATCH(req: Request) {
  const { id, status } = await req.json();
  projectsStore = projectsStore.map(p =>
    p.id === id
      ? { ...p, status, progress: status === 'completed' ? 100 : p.progress }
      : p
  );
  return NextResponse.json({ success: true });
}
