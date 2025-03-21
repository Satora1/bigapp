"use client"
import React, { useRef, useState } from 'react'
import { IKImage, IKVideo, ImageKitProvider, IKUpload, ImageKitContext } from "imagekitio-next";
import config from '@/lib/config';
import { Button } from './ui/button';
import Image from 'next/image';
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

const ImageUpload = () => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ FilePath: string } | null>(null)
  const onError = () => { }
  const onSuccess = () => { }
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
      <Button className='upload-btn'>
        <Image src="/icons/upload.svg" alt='upload-icon' width={20} height={20} className='object-contain' />
        <p className='text-base text-light-100'>
          upload a File
        </p>
        {file && <p className='upload-filename'></p>}
      </Button>
    </ImageKitProvider>
  )
}

export default ImageUpload