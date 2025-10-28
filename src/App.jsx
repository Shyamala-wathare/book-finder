import React, { useState } from "react";

const App = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchBooks = async () => {
    if (query.trim() === "") {
      setError("Please enter a book title!");
      return;
    }

    setLoading(true);
    setError("");
    setBooks([]);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${query}`
      );
      const data = await response.json();
      if (data.docs.length === 0) {
        setError("No books found!");
      } else {
        setBooks(data.docs.slice(0, 10)); // show only first 10 results
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">📚 Book Finder</h1>

      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          type="text"
          className="border p-2 rounded w-64 sm:w-80"
          placeholder="Enter book title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={searchBooks}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {books.map((book, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
          >
            {book.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
                className="w-32 h-48 object-cover mb-3 rounded"
              />
            ) : (
              <div className="w-32 h-48 bg-gray-300 mb-3 rounded flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
            <h2 className="text-lg font-semibold text-center">{book.title}</h2>
            <p className="text-sm text-gray-700">
              {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
            </p>
            <p className="text-xs text-gray-500">
              {book.first_publish_year || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
