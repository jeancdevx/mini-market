import Image from 'next/image'

import AddToCart from '@/components/AddToCart'

import { AspectRatio } from '@/components/ui/AspectRatio'
import { Badge } from '@/components/ui/Badge'
import { Separator } from '@/components/ui/Separator'

import { formatCurrency } from '@/lib/utils'

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
    <div className='flex h-full w-full max-w-xs flex-col gap-y-2 sm:max-w-[280px] md:max-w-[350px] lg:max-w-[300px]'>
      <AspectRatio ratio={16 / 9}>
        <div className='relative h-full w-full bg-background'>
          <Image
            src={image}
            alt={name}
            layout='fill'
            objectFit='contain'
            objectPosition='center'
            quality={100}
            className='h-full w-full rounded-md'
          />
        </div>
      </AspectRatio>

      <div className='flex flex-col gap-y-2'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-bold'>{name}</h3>
          <p className='text-sm font-bold text-green-700 dark:text-green-400'>
            {formatCurrency(price)}
          </p>
        </div>

        <p className='truncate text-sm text-muted-foreground'>{description}</p>

        <div className='flex items-center justify-between'>
          <p className='text-sm font-semibold text-foreground'>
            {stock} in stock
          </p>
          <Badge>{category}</Badge>
        </div>

        <Separator />

        <AddToCart id={id} />
      </div>
    </div>
  )
}

export default ProductItem
