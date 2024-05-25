interface ImageResponse {
  public_id: string
  secure_url: string
}

interface UploadFileProps {
  formData: FormData | null
  onUploadProgress: (progress: number) => void
}

export const uploadFile = async ({
  formData,
  onUploadProgress
}: UploadFileProps): Promise<ImageResponse> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL || '',
    {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: formData
    }
  )

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const data = await response.json()

  return { secure_url: data.secure_url, public_id: data.public_id }
}
