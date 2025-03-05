'use client';

import { IProduct } from "@/app/definitions/product"
import Image from "next/image"
import { useState } from "react";

export const dynamic = 'force-dynamic';

export default function ProductPage() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(true)

  useState(() => {
    fetch(process.env.API_URL + '/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .finally(() => setLoading(false))
  })

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl">Product Page</h1>

      {loading && <p>Loading...</p>}

      <div className="flex gap-4 flex-wrap">
        {products.map(product => {
          return (
            <div key={product.id} className="border p-2 my-2 w-[300px]">
              <Image src={product.image} alt={product.title} className="w-32 h-32 object-cover" />
              <h2 className="text-xl">{product.title}</h2>
              <p>${product.price}</p>
            </div>
          )
        })}
      </div>

    </div>
  )
}