import Image from 'next/image'
import { AspectRatio } from '../ui/AspectRatio'

interface HeroImageProps {
  image: string
  alt: string
  aspectRatio: number
  width: number
  height: number
  layout: 'fixed' | 'responsive'
  objectFit: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  objectPosition: string
  quality: number
  priority: boolean
  loading: 'eager' | 'lazy'
  className: string
  children: React.ReactNode
}

const HeroImage = ({
  image,
  alt,
  aspectRatio,
  width,
  height,
  layout,
  objectFit,
  objectPosition,
  quality,
  priority,
  loading,
  className,
  children
}: HeroImageProps) => {
  return (
    <div className={className}>
      <div className='relative h-full max-h-[600px] w-full overflow-hidden rounded-lg'>
        <AspectRatio
          ratio={aspectRatio}
          className='relative overflow-hidden rounded-lg'
        >
          <Image
            src={image}
            alt={alt}
            width={width}
            height={height}
            layout={layout}
            objectFit={objectFit}
            objectPosition={objectPosition}
            quality={quality}
            priority={priority}
            loading={loading}
          />
        </AspectRatio>

        <div className='absolute inset-0 bg-black/20 backdrop-blur-sm' />

        <div className='absolute inset-0 mx-auto flex max-w-2xl flex-col items-center justify-center gap-y-4 p-4 text-center text-white'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default HeroImage
