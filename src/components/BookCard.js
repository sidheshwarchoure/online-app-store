import React from 'react';
import './BookCard.css'; // Import the CSS file for BookCard styling

const BookCard = ({ book, onClick, isSelected }) => {
  const thumbnail = book.volumeInfo.imageLinks?.thumbnail || ''; // Get the thumbnail image URL

  return (
    <div onClick={onClick} className={`book-card ${isSelected ? 'selected' : ''}`} style={{ cursor: 'pointer' }}>
      <div className="book-image">
        {thumbnail && <img src={thumbnail} alt={book.volumeInfo.title} />}
        {!thumbnail && <span>No Image</span>}
      </div>
      <div className="book-details">
        <h2>{book.volumeInfo.title}</h2>
        <p>{book.volumeInfo.authors && book.volumeInfo.authors.join(', ')}</p>
        {/* Add more book information as needed */}
      </div>
    </div>
  );
};

export default BookCard;
