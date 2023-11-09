'use client'

import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { useCallback } from "react"
import { TbPhotoPlus } from "react-icons/tb"

const ImageUpload = ({value, onChange}) => {

  const handleUpload = useCallback((result) => {
    onChange(result.info.secure_url);
  }, [onChange])

  return (
    <CldUploadWidget onUpload={handleUpload} uploadPreset="dxotfueo" options={{ maxFiles: 1}}>
      { ({open}) => {
        return (
          <div onClick={() => open?.()} className="relative flex flex-col items-center justify-center gap-4 p-20 border-2 border-dashed transition hover:opacity-70 cursor-pointer border-neutral-300 text-neutral-600">
          <TbPhotoPlus size={50}/>
          <p className="font-semibold text-lg">Click to upload</p>

          {value && (
            <div className="absolute inset-0 w-full h-full ">
              <Image src={value} alt="Upload" fill style={{ objectFit: 'cover'}} /> 
            </div>
          )}
          </div>
        )
      } }
    </CldUploadWidget>
  )
}

export default ImageUpload