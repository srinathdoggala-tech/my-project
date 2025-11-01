import { useState } from 'react'
import '../App.css'

function LibraryManagement({ books: initialBooks }) {
    const [books, setBooks] = useState(initialBooks)
    const [search, setSearch] = useState('')
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')

    const handleAddBook = () => {
        if (newTitle.trim() && newAuthor.trim()) {
        setBooks([...books, { title: newTitle.trim(), author: newAuthor.trim() }])
        setNewTitle('')
        setNewAuthor('')
        }
    }

    const handleRemoveBook = idx => {
        setBooks(books.filter((_, i) => i !== idx))
    }

    const filteredBooks = books.filter(
        b =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <main className="library-card">
        <header className="library-header">
            <h1>Library Management</h1>
        </header>
        <section className="library-search">
            <input
            type="text"
            placeholder="Search by title or author"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input"
            />
        </section>
        <section className="library-form">
            <input
            type="text"
            placeholder="New book title"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            className="form-input"
            />
            <input
            type="text"
            placeholder="New book author"
            value={newAuthor}
            onChange={e => setNewAuthor(e.target.value)}
            className="form-input"
            />
            <button className="add-btn" onClick={handleAddBook}>Add Book</button>
        </section>
        <section className="library-list">
            {filteredBooks.length === 0 ? (
            <p className="empty-msg">No books found.</p>
            ) : (
            filteredBooks.map((b, idx) => (
                <div key={idx} className="book-item">
                <div>
                    <span className="book-title">{b.title}</span>
                    <span className="book-author">by {b.author}</span>
                </div>
                <button
                    className="remove-btn"
                    onClick={() => handleRemoveBook(books.indexOf(b))}
                >
                    Remove
                </button>
                </div>
            ))
            )}
        </section>
        </main>
    )
}

export default LibraryManagement
