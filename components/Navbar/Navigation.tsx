'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

interface Route {
  label: string
  href: string
  isActive: boolean
  isAdmin?: boolean
}

const Navigation = () => {
  const pathname = usePathname()

  const routes: Route[] = [
    { label: 'Dashboard', href: '/', isActive: pathname === '/' },
    {
      label: 'Categories',
      href: '/categories',
      isActive: pathname.includes('/categories'),
      isAdmin: true
    },
    {
      label: 'Products',
      href: '/products',
      isActive: pathname.includes('/products'),
      isAdmin: true
    },
    {
      label: 'Orders',
      href: '/orders',
      isActive: pathname.includes('/orders'),
      isAdmin: true
    }
  ]

  return (
    <nav className='flex h-full items-center space-x-2 overflow-y-auto sm:space-x-4 lg:space-x-6'>
      {routes.map(({ label, href, isActive }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'text-sm font-medium transition-colors duration-200 hover:text-foreground/80',
            isActive ? 'font-semibold text-foreground' : 'text-foreground/60'
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}

export default Navigation
