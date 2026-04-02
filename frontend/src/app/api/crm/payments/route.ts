import { NextResponse } from 'next/server';
import { PAYMENTS } from '@/app/crm/data/seed';

export async function GET() {
  return NextResponse.json(PAYMENTS);
}
