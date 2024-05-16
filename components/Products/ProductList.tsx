'use client'

import Image from 'next/image'

import type { Category, Product } from '@prisma/client'

import ProductItem from './ProductItem'

interface ProductListProps {
  products: Array<Product & { category: Category }>
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <>
      {products.length > 0 ? (
        <>
          <div className='grid w-full grid-cols-1 place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {products.map(product => (
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
            ))}
          </div>
        </>
      ) : (
        <div className='flex flex-col items-center justify-center gap-4'>
          <Image
            src='/empty.png'
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
    </>
  )
}

export default ProductList
