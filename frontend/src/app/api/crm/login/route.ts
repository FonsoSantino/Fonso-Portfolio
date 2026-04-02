import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const VALID_USERS = [
    { email: 'admin@crm.com', password: 'admin123', name: 'Alex Admin', role: 'Owner', avatarColor: '#6366f1' },
    { email: 'demo@crm.com', password: 'demo123', name: 'Demo User', role: 'Viewer', avatarColor: '#10b981' },
  ];

  const match = VALID_USERS.find(u => u.email === email && u.password === password);
  if (!match) {
    return NextResponse.json({ success: false, error: 'Invalid email or password.' }, { status: 401 });
  }

  const { password: _, ...user } = match;
  return NextResponse.json({ success: true, user: { id: 'admin', ...user } });
}
