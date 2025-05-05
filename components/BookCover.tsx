"use client";
import React from "react";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";

interface Props {
  coverImage?: string;
  backText?: string;
  coverUrl2?:string
}
type BookCoverVariant = "extrasmall" | "small" | "medium" | "regular" | "wide"| "customSize";

const variantStyles: Record<BookCoverVariant, string> = {
  extrasmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
  customSize:"h-[600px] w-[600px]"
};

interface Props {
  className?: string;
  variant?: BookCoverVariant;
  coverColor?: string;
  coverImage?: string;
  coverImage2?: string;
}
const BookCoverFlip = ({
  coverImage = "https://placehold.co/600x600.png",
  coverImage2 = "https://placehold.co/600x600.png",
}: Props) => {
  return (
    <div className="card big-card">
      <div className="first-content">
        <IKImage
          path={coverImage}
          urlEndpoint={config.env.imagekit.urlEndpoint}
          alt="Book cover"
          width={600}
          height={600}
          className="rounded-md object-fill"
        />
      </div>
      <div className="second-content">
      <IKImage
          path={coverImage2}
          urlEndpoint={config.env.imagekit.urlEndpoint}
          alt="Book cover"
          width={600}
          height={600}
          className="rounded-md object-fill"
        />
      </div>
    </div>
  );
};

export default BookCoverFlip;
