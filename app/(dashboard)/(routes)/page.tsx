import getProducts from '@/actions/getProducts.action'
import HeroImage from '@/components/HeroImage'
import ProductList from '@/components/Products/ProductList'
import Search from '@/components/Search'
import { cn } from '@/lib/utils'
import { Urbanist } from 'next/font/google'

const font = Urbanist({ subsets: ['latin'] })

interface DashboardPageProps {
  searchParams: {
    productName?: string
    categoryId?: string
  }
}

export default async function DashboardPage({
  searchParams
}: DashboardPageProps) {
  const products = await getProducts({ ...searchParams })

  return (
    <>
      <main
        className={cn(
          'flex flex-col items-center justify-center gap-y-4 px-4 md:px-6 lg:px-8',
          font.className
        )}
      >
        <HeroImage
          image='/dashboard.png'
          alt='Hero image'
          aspectRatio={16 / 9}
          width={1280}
          height={720}
          layout='responsive'
          objectFit='cover'
          objectPosition='center'
          quality={100}
          priority={true}
          loading='eager'
          className='w-full max-w-7xl py-4'
        >
          <h1 className='text-4xl font-black sm:text-5xl md:text-6xl lg:text-7xl'>
            Welcome to the dashboard
          </h1>
          <p className='text-xs font-medium sm:text-sm md:text-lg'>
            Find the products you need
          </p>
        </HeroImage>

        <div className='w-full max-w-7xl py-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-bold md:text-4xl'>Products</h2>

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
