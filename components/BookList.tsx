import React from "react";
import BookCard from "@/components/BookCard";

interface Props {
  title: string;
  author: string;
  books: Book[];
  containerClassName?: string;
}

const BookList = ({ title, books, containerClassName, author }: Props) => {
  if (books.length < 1) return;

  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-4xl text-light-100 ">{title}</h2>
      <h2 className="font-bebas-neue text-4xl text-light-100 ">{author}</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {books.map((book) => (
          <BookCard key={book.title} {...book}  />
        ))}
      </ul>
    </section>
  );
};
export default BookList;