import React from 'react'
cont variantStyles = {
  extaraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",


}
interface Props {
  calssName?: string;
  variant: "wide" | "small"
  coverColor: string;
  coverUrl: string
}

const BookCover = ({ className, variant, coverColor, coverUrl }: Props) => {
  return (
    <div>BookCover</div>
  )
}

export default BookCover