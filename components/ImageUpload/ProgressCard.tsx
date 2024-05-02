interface ProgressCardProps {
  progressStatus: number
}

export const ProgressCard = ({ progressStatus }: ProgressCardProps) => {
  const width = progressStatus.toString().concat('%')

  return (
    <div className='flex h-[144px] w-full flex-col items-center justify-center gap-8 rounded-full sm:w-[402px]'>
      <div className='flex w-full items-center justify-between'>
        <p className='text-lg font-semibold'>Uploading...</p>
        <p className='text-sm'>{progressStatus}%</p>
      </div>

      <div className='relative h-2.5 w-full rounded-full border-2 border-input bg-white'>
        <div
          className='absolute inset-y-0 h-full rounded-full bg-purple-500 transition-[width]'
          style={{ width }}
        />
      </div>
    </div>
  )
}
