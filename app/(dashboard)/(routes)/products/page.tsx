import { getProducts } from '@/server/products'

import ProductClient from '@/components/Products/ProductClient'

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className='flex flex-col'>
      <div className='flex-1 p-8 pt-6'>
        <ProductClient products={products} />
      </div>
    </div>
  )
}
