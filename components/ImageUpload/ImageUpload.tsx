'use client'

import { useEffect } from 'react'

import { Trash } from 'lucide-react'

import { Button } from '@/components/ui/Button'

import { AspectRatio } from '../ui/AspectRatio'
import { ButtonFile } from './ButtonFile'
import { Dropzone } from './Dropzone'
import { ImagePreview } from './ImagePreview'
import { ProgressCard } from './ProgressCard'
import { useUpload } from './use-image-upload.hook'

interface ImageUploadProps {
  disabled?: boolean
  onChange: (value: string) => void
  onRemove: (value: string) => void
  value: string
}

const ImageUpload = ({
  disabled,
  onChange,
  onRemove,
  value
}: ImageUploadProps) => {
  const uploadImage = useUpload()

  const onUpload = () => {
    onChange(uploadImage.image?.secure_url || '')
  }

  useEffect(() => {
    if (uploadImage.isSuccess) {
      onUpload()
    }
  }, [uploadImage.isSuccess])

  return (
    <div className='flex flex-col gap-y-4'>
      {value ? (
        <>
          <div className='w-full rounded-xl py-4 sm:mx-auto sm:max-w-sm'>
            {!uploadImage.isFetching && (
              <div className='relative flex h-full w-full flex-col items-center gap-y-6'>
                <AspectRatio ratio={4.15 / 4}>
                  <ImagePreview imageUrl={value} />
                </AspectRatio>

                <div className='absolute right-2 top-2'>
                  <Button
                    type='button'
                    onClick={() => {
                      onRemove(value || '')

                      onChange('')

                      uploadImage.onRemoveImage()
                    }}
                    variant='destructive'
                    size='sm'
                    disabled={disabled}
                  >
                    <Trash className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {!uploadImage.isFetching && (
            <div
              {...uploadImage.getRootProps({ className: 'dropzone' })}
              className='w-full rounded-xl py-4 sm:mx-auto sm:max-w-sm'
            >
              <div className='flex h-full w-full flex-col items-center gap-y-4'>
                <AspectRatio ratio={4.15 / 4}>
                  <Dropzone
                    isActive={uploadImage.isDragActive}
                    onInputProps={uploadImage.getInputProps}
                  />
                </AspectRatio>
              </div>
            </div>
          )}
        </>
      )}

      {!uploadImage.isFetching && !uploadImage.isSuccess && (
        <div className='flex w-full items-center justify-center rounded-xl sm:mx-auto sm:max-w-sm'>
          <span className='text-xs font-medium text-muted-foreground'>Or</span>
        </div>
      )}

      {!uploadImage.isFetching && !uploadImage.isSuccess && (
        <div className='flex w-full items-center justify-center rounded-xl sm:mx-auto sm:max-w-sm'>
          <ButtonFile
            disabled={disabled}
            inputRef={uploadImage.inputRef}
            onClick={() => uploadImage.inputRef.current?.click()}
            onChange={uploadImage.onChangeFile}
          />
        </div>
      )}

      {uploadImage.isFetching && (
        <div className='flex w-full items-center justify-center'>
          <ProgressCard progressStatus={uploadImage.progressStatus} />
        </div>
      )}
    </div>
  )
}

export default ImageUpload
