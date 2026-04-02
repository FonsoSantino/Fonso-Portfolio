import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        // Simulate B2B quote request processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('Quote Request Received:', body);

        return NextResponse.json({
            success: true,
            quoteId: `QT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            message: 'Quote request submitted. A representative will contact you shortly.'
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to submit quote request' },
            { status: 500 }
        );
    }
}
