import { NextRequest, NextResponse } from 'next/server';
import products from '../../../soluciones-forestales/data/products.json';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const id = searchParams.get('id');

  if (id) {
    const product = products.find((p) => p.id === id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  }

  if (category) {
    const filteredProducts = products.filter((p) => p.category === category);
    return NextResponse.json(filteredProducts);
  }

  return NextResponse.json(products);
}
