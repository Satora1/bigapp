"use client"
import React from 'react'
import { IKImage, IKVideo, ImageKitProvider, IKUpload, ImageKitContext } from "imagekitio-next";
import config from '@/lib/config';


const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`)
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`req failed with status ${response.status}. ${errorText}`)
    }
    const data = await response.json()
    const {signature, expire, token} = data
    return {signature, expire, token}
  } catch (error: any) {
    throw new Error(`Authentication req failed: ${error.message}`)
  }
}

const ImageUpload = () => {
  return (
    <div>ImageUpload</div>
  )
}

export default ImageUpload