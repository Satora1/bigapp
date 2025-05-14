"use client"
import config from "@/lib/config";
import { IKImage } from 'imagekitio-next'
import React from 'react'

interface Props {
    coverImage?: string;
}

const ImageForAdmin = ({ coverImage = "https://placehold.co/600x600.png",
}: Props) => {
    return (
        <IKImage
         path={coverImage}
          urlEndpoint={config.env.imagekit.urlEndpoint}
          alt="Book cover"
          width={120}
          height={120}
          className="rounded-md object-fill"
        />
    )
}

export default ImageForAdmin
