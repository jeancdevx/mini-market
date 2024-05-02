import Image from 'next/image'

import type { DropzoneInputProps } from 'react-dropzone'

import { cn } from '@/lib/utils'

interface DropzoneProps {
  isActive?: boolean
  onInputProps: <T extends DropzoneInputProps>(props?: T) => T
}

export const Dropzone = ({ isActive = false, onInputProps }: DropzoneProps) => {
  return (
    <div
      className={cn(
        'relative flex aspect-video h-full w-full flex-col items-center justify-center gap-y-4 overflow-hidden rounded-xl border-2 border-dashed py-10 transition-colors duration-300',
        isActive ? 'border-pink-600' : 'border-purple-600'
      )}
    >
      <input {...onInputProps()} />

      <div className='relative h-[88px] w-[115px]'>
        <Image
          src='/background-upload.svg'
          fill
          alt='background upload'
          priority
          className='h-full w-full object-cover'
        />
      </div>

      <p
        className={cn(
          'text-center text-xs font-medium transition-colors duration-300',
          isActive ? 'text-pink-700' : 'text-muted-foreground'
        )}
      >
        Drag & Drop your image here
      </p>
    </div>
  )
}
