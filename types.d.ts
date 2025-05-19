interface Book {
  id: string
  title: string
  author: string
  genre: string
  rating: number
  totalCopies: number
  availableCopies: number
  price: number
  soldPrice: number
  priceBought: number
  description: string
  coverColor: string
  coverUrl: string
  coverUrl2: string
  videoUrl: string
  summary: string
  vintedLink: string
  createdAt: Date | null
}

interface AuthCredentials {
  fullName: string
  email: string
  password: string
  vintedNickname: string
}

interface Favorites {
  id: string
  userId: string
  bookId: string
}

interface BookParamas {
  title: string;
  author: string;
  genre: string;
  rating: number;
  coverUrl: string;
  coverColor: string;
  description: string;
  totalCopies: number;
  videoUrl: string;
  summary: string;
}

interface BorrowBookParams {
  bookId: string;
  userId: string;
}