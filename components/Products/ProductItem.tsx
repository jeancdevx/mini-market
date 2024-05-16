import Image from 'next/image'

import { formatCurrency } from '@/lib/utils'

import { AspectRatio } from '@/components/ui/AspectRatio'

import AddCart from '../Cart/AddCart'

interface ProductItemProps {
  id: string
  name: string
  description: string
  price: number
  image: string
  stock: number
  category: string
}

const ProductItem = ({
  id,
  name,
  description,
  price,
  image,
  stock,
  category
}: ProductItemProps) => {
  return (
    <div className='flex h-full w-full max-w-xs flex-col gap-y-2 sm:max-w-[280px] md:max-w-[350px] lg:max-w-[320px]'>
      <AspectRatio ratio={4 / 3}>
        <div className='relative h-full w-full rounded-lg'>
          <Image
            src={image}
            alt={name}
            fill
            quality={100}
            className='h-full w-full rounded-md object-contain'
          />
        </div>
      </AspectRatio>

      <div className='flex flex-col gap-y-2'>
        <div className='flex items-center justify-between'>
          <h3 className='truncate text-lg font-bold'>{name}</h3>
          <p className='text-sm font-bold text-green-800 dark:text-green-400'>
            {formatCurrency(price)}
          </p>
        </div>

        <p className='truncate text-sm text-muted-foreground'>{description}</p>

        <div className='flex items-center justify-between'></div>

        <AddCart id={id} />
      </div>
    </div>
  )
}

export default ProductItem
