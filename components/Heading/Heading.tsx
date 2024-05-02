interface HeadingProps {
  title: string
  description: string
}

const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div className='flex flex-col space-y-1.5'>
      <h1 className='text-3xl font-bold md:text-4xl lg:text-5xl'>{title}</h1>
      <p className='text-sm text-muted-foreground'>{description}</p>
    </div>
  )
}

export default Heading
