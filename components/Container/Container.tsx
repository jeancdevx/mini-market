import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={cn('mx-auto p-4 md:px-6 lg:px-8', className)}>
      {children}
    </div>
  )
}

export default Container
