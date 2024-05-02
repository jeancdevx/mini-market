'use client'

import type { Category, Product } from '@prisma/client'

import Image from 'next/image'
import ProductItem from './ProductItem'

interface ProductListProps {
  products: Array<Product & { category: Category }>
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className='flex w-full max-w-7xl flex-wrap justify-center gap-y-8 py-4 sm:justify-between'>
      {products.length > 0 ? (
        products.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            image={product.image}
            stock={product.stock}
            category={product.category.name}
          />
        ))
      ) : (
        <div className='flex w-full flex-col items-center justify-center'>
          <Image
            src='/empty.jpg'
            alt='Empty'
            width={256}
            height={256}
            className='grayscale'
          />
          <p className='text-lg font-bold text-muted-foreground md:text-3xl lg:text-5xl'>
            No products found...
          </p>
        </div>
      )}
    </div>
  )
}

export default ProductList
