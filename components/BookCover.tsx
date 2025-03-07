import React from 'react'
interface Props{
    calssName?:string;
    variant:"wide"|"small"
    coverColor:string;
    coverUrl:string
}

const BookCover = ({className,variant,coverColor,coverUrl}:Props) => {
  return (
    <div>BookCover</div>
  )
}

export default BookCover