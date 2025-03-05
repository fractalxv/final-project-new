import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Centralized API fetch function
export async function fetchFakeStoreAPI(endpoint: string, method: string = 'GET', body?: any) {
  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await prisma.fetch(`https://fakestoreapi.com${endpoint}`, options);
    
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }
    
    return await prisma.response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Fetch a specific product by ID
export async function GET(
  request: Request, 
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.fetchFakeStoreAPI(`/products/${params.id}`);
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Product not found', error: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 404 }
    );
  }
}

// Update a product
export async function PUT(
  request: Request, 
  { params }: { params: { id: string } }
) {
  try {
    const data = await prisma.request.json();
    const updatedProduct = await prisma.fetchFakeStoreAPI(`/products/${params.id}`, 'PUT', data);
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to update product', error: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 400 }
    );
  }
}

// Delete a product
export async function DELETE(
  request: Request, 
  { params }: { params: { id: string } }
) {
  try {
    await prisma.fetchFakeStoreAPI(`/products/${params.id}`, 'DELETE');
    return NextResponse.json(
      { message: 'Product deleted successfully' }, 
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to delete product', error: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 400 }
    );
  }
}