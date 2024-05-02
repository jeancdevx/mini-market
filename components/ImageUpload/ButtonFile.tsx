import type { ChangeEvent, LegacyRef } from 'react'

import { Button } from '@/components/ui/Button'

interface ButtonFileProps {
  disabled?: boolean
  inputRef: LegacyRef<HTMLInputElement>
  onClick: () => void
  onChange: (ev: ChangeEvent<HTMLInputElement>) => void
}

export const ButtonFile = ({
  disabled,
  inputRef,
  onClick,
  onChange
}: ButtonFileProps) => {
  return (
    <Button
      type='button'
      onClick={onClick}
      disabled={disabled}
    >
      Choose a file
      <input
        ref={inputRef}
        type='file'
        name='image'
        accept='image/png, image/gif, image/jpeg'
        hidden
        onChange={onChange}
      />
    </Button>
  )
}
