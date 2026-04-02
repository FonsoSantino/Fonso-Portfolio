import { NextResponse } from 'next/server';
import { CLIENTS } from '@/app/crm/data/seed';

export async function GET() {
  return NextResponse.json(CLIENTS);
}
