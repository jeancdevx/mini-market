import { format } from 'date-fns'

import { db } from '@/lib/db'

import ProductClient from '@/components/Products/ProductClient'

export default async function ProductsPage() {
  const products = await db.product.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      category: true
    }
  })

  const formattedProducts = products.map(
    ({ id, name, image, stock, price, category, createdAt }) => ({
      id,
      name,
      image,
      stock,
      price,
      category: category.name,
      createdAt: format(createdAt, 'MMMM do, yyyy')
    })
  )

  return (
    <div className='flex flex-col'>
      <div className='flex-1 p-8 pt-6'>
        <ProductClient products={formattedProducts} />
      </div>
    </div>
  )
}
