import { NextResponse } from 'next/server';
import { CONTRACTS } from '@/app/crm/data/seed';

export async function GET() {
  return NextResponse.json(CONTRACTS);
}
