import React, { useEffect, useState } from 'react';
import BookCard from './components/BookCard';
import SearchBar from './components/SearchBar';
import BookDetail from './components/BookDetail';

const App = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchInitialBooks = async () => {
      // Fetch initial book data for 'harry+potter' and 'Sherlock+Holmes'
      try {
        const response1 = await fetch('https://www.googleapis.com/books/v1/volumes?q=harry+potter');
        const data1 = await response1.json();
        const response2 = await fetch('https://www.googleapis.com/books/v1/volumes?q=Sherlock+Holmes');
        const data2 = await response2.json();

        const initialBooks = [...data1.items, ...data2.items];
        setBooks(initialBooks);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchInitialBooks();
  }, []);

  const handleSearch = async (query) => {
    // Fetch data from the Google Books API based on the user's query
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
      const data = await response.json();
      setBooks(data.items);
      setSelectedBook(null); // Clear selected book when a new search is performed
    } catch (error) {
      console.error('Error fetching book data:', error);
    }
  };

  const handleBookClick = (book) => {
    // Set the selected book when a book is clicked
    setSelectedBook(book);
  };

  return (
    <div>
      {/* Add the SearchBar component */}
      <SearchBar onSearch={handleSearch} />

      {/* Display the list of books */}
      {books.map((book) => (
        <BookCard key={book.id} book={book} onClick={() => handleBookClick(book)} isSelected={book === selectedBook} />
      ))}

      {/* Show the detailed information panel for the selected book */}
      {selectedBook && <BookDetail book={selectedBook} />}
    </div>
  );
};

export default App;
