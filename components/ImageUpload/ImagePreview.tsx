import Image from 'next/image'

interface ImagePreviewProps {
  imageUrl: string
}

export const ImagePreview = ({ imageUrl = '' }: ImagePreviewProps) => {
  return (
    <div className='h-full w-full'>
      <div className='relative flex h-full w-full'>
        <Image
          src={imageUrl}
          fill
          alt='image'
          priority
          className='h-full w-full rounded-xl object-contain'
        />
      </div>
    </div>
  )
}
