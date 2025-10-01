import React, { useState } from 'react';

const App = () => {
  const [books, setBooks] = useState([
    { title: '1984', author: 'George Orwell' },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  ]);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddBook = () => {
    if (newTitle && newAuthor) {
      setBooks([...books, { title: newTitle, author: newAuthor }]);
      setNewTitle('');
      setNewAuthor('');
    }
  };

  const handleRemoveBook = (indexToRemove) => {
    const newBooks = books.filter((_, index) => index !== indexToRemove);
    setBooks(newBooks);
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Library Management</h2>
        
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        
        {/* Add Book Inputs and Button */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="New book title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <input
            type="text"
            placeholder="New book author"
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button
            onClick={handleAddBook}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            Add Book
          </button>
        </div>
        
        {/* Book List */}
        <div className="space-y-3">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm">
                <span className="text-gray-600 font-medium">
                  {book.title} by {book.author}
                </span>
                <button
                  onClick={() => handleRemoveBook(index)}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 mt-4">No books found. Try adding one!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
