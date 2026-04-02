import { NextRequest, NextResponse } from 'next/server';
import classes from '@/app/ironforge/data/classes.json';

export async function GET() {
    return NextResponse.json(classes);
}
