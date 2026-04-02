import { NextRequest, NextResponse } from 'next/server';
import plans from '@/app/ironforge/data/plans.json';

export async function GET() {
    return NextResponse.json(plans);
}
