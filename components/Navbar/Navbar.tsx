import Image from 'next/image'
import Link from 'next/link'

import { UserButton } from '@clerk/nextjs'

import CartIcon from '@/components/Cart/CartIcon'
import Container from '@/components/Container'

import Navigation from './Navigation'

const Navbar = () => {
  return (
    <header className='sticky top-0 z-50 h-16 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <Container className='container flex h-full max-w-screen-2xl items-center justify-center gap-x-4'>
        <Link
          href='/'
          className='flex items-center space-x-2 font-bold sm:mr-6'
        >
          <Image
            src='/logo.svg'
            alt='Logo'
            width={32}
            height={32}
            className='mr-1 h-auto w-auto sm:h-8 sm:w-8'
            priority
          />
          <span className='hidden sm:inline'>market/ui</span>
        </Link>

        <Navigation />

        <div className='ml-auto flex items-center gap-x-4'>
          <CartIcon />

          <UserButton afterSignOutUrl='/sign-in' />
        </div>
      </Container>
    </header>
  )
}

export default Navbar
