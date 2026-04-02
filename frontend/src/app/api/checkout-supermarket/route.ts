import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        // Simulate real-world processing
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log('Supermarket Order Received:', body);

        return NextResponse.json({
            success: true,
            orderId: `SM-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            message: 'Order placed successfully!'
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to process supermarket checkout' },
            { status: 500 }
        );
    }
}
