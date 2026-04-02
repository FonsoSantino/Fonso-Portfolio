import { NextResponse } from 'next/server';
import { MESSAGES } from '@/app/crm/data/seed';
import type { Message } from '@/app/crm/data/seed';

let messagesStore: Message[] = [...MESSAGES];

export async function GET() {
  return NextResponse.json(messagesStore);
}

export async function POST(req: Request) {
  const { subject, body, fromName, fromAvatar, toId } = await req.json();
  const newMsg: Message = {
    id: `m${Date.now()}`,
    fromId: 'admin',
    fromName: fromName || 'Admin',
    fromAvatar: fromAvatar || '#6366f1',
    toId: toId || 'c1',
    subject,
    body,
    timestamp: new Date().toISOString(),
    read: true,
    starred: false,
  };
  messagesStore = [newMsg, ...messagesStore];
  return NextResponse.json({ success: true, message: newMsg });
}
