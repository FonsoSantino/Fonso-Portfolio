import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        // Simulate subscription processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('Gym Subscription Received:', body);

        return NextResponse.json({
            success: true,
            subscriptionId: `SUB-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            message: 'Subscription activated successfully!'
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to process subscription' },
            { status: 500 }
        );
    }
}
