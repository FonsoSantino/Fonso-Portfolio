import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // In a real production app, you would send an email or save to a DB here.
    console.log('New contact request from Soluciones Forestales:', { name, email, message });

    return NextResponse.json({ message: 'Message sent successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
