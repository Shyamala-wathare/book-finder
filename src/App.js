import React, { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const searchBooks = async () => {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}`
    );
    const data = await response.json();
    setBooks(data.items || []);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        📚 Book Finder
      </h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for a book..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded-l-lg w-80 focus:outline-none"
        />
        <button
          onClick={searchBooks}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition"
          >
            <img
              src={
                book.volumeInfo.imageLinks?.thumbnail ||
                "https://via.placeholder.com/150"
              }
              alt={book.volumeInfo.title}
              className="w-full h-48 object-cover mb-3"
            />
            <h2 className="font-semibold text-lg mb-1">
              {book.volumeInfo.title}
            </h2>
            <p className="text-sm text-gray-600">
              {book.volumeInfo.authors?.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
