import { NextRequest, NextResponse } from 'next/server';
import products from '@/app/supermarket/data/products.json';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search')?.toLowerCase();

    let filteredProducts = [...products];

    if (category && category !== 'todos') {
        if (category === 'ofertas') {
            filteredProducts = filteredProducts.filter(p => (p as any).oldPrice !== undefined);
        } else {
            filteredProducts = filteredProducts.filter(p => p.category === category);
        }
    }

    if (search) {
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(search) || 
            p.description.toLowerCase().includes(search)
        );
    }

    // Simulate small delay for loading states
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(filteredProducts);
}
