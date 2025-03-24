"use client"
import React, { useRef, useState } from 'react'
import { IKImage, IKVideo, ImageKitProvider, IKUpload, ImageKitContext } from "imagekitio-next";
import config from '@/lib/config';
import { Button } from './ui/button';
import Image from 'next/image';
import { toast } from 'sonner';
const { env: { imagekit: { publicKey, urlEndpoint } } } = config;



const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`)
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`req failed with status ${response.status}. ${errorText}`)
    }
    const data = await response.json()
    const { signature, expire, token } = data
    return { signature, expire, token }
  } catch (error: any) {
    throw new Error(`Authentication req failed: ${error.message}`)
  }
}

const ImageUpload = ({ onFileChange }: { onFileChange: (filePath: string) => void }) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null)
  const onError = (error: any) => {
    console.log(error)
    toast("Image upload failed. Try again later", {
      description: "Please check your network and retry.",
    });
    
  }
  const onSuccess = (res: any) => {
    setFile(res)
    onFileChange(res.filePath)
    toast("Image uploaded successfully", {
      description: `${res.filePath} uploaded successfully`,
    });
    
  }
  return (
    <ImageKitProvider publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className='hidden'
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="test-upload.png"
      />
      <Button className='upload-btn' onClick={(e) => {
        e.preventDefault()
        if (ikUploadRef.current) {
          //@ts-ignore
          ikUploadRef.current?.click()
        }
      }}>
        <Image src="/icons/upload.svg" alt='upload-icon' width={20} height={20} className='object-contain' />
        <p className='text-base text-light-100'>
          upload a File
        </p>
        {file && <p className='upload-filename'>{file.filePath}</p>}
      </Button>
      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={500}
        />
      )}
    </ImageKitProvider>
  )
}

export default ImageUpload