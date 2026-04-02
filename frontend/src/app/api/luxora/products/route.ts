import { NextRequest, NextResponse } from 'next/server';
import products from '@/app/luxora/data/products.json';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let filteredProducts = [...products];

    if (category && category !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    // Simulate luxury "slow" feel with a slight delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json(filteredProducts);
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { id } = body;
        const product = products.find(p => p.id === id);
        
        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}
