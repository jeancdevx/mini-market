import { Urbanist } from 'next/font/google'

import { getCategories } from '@/server/categories'
import { getProductsDashboard } from '@/server/products'

import { cn } from '@/lib/utils'

import Categories from '@/components/Categories'
import ProductList from '@/components/Products/ProductList'
import Search from '@/components/Search'

interface DashboardPageProps {
  searchParams: {
    productName?: string
    categoryId?: string
  }
}

const font = Urbanist({ subsets: ['latin'] })

export default async function DashboardPage({
  searchParams
}: DashboardPageProps) {
  const products = await getProductsDashboard({ ...searchParams })
  const categories = await getCategories()

  return (
    <>
      <main
        className={cn(
          'mx-auto flex min-h-screen max-w-7xl flex-col items-center gap-y-4 px-4 md:px-6 lg:px-8',
          font.className
        )}
      >
        <div className='w-full space-y-8 py-4'>
          <div className='flex items-center justify-between gap-x-8'>
            <h2 className='text-2xl font-bold md:text-4xl'>Products</h2>

            <Categories categories={categories} />

            <Search />
          </div>

          <ProductList products={products} />
        </div>
      </main>

      <footer className='flex h-16 w-full items-center justify-center border-t border-input'>
        <p className='text-sm font-medium text-muted-foreground'>
          © {new Date().getFullYear()} Next.js E-commerce
        </p>
      </footer>
    </>
  )
}
