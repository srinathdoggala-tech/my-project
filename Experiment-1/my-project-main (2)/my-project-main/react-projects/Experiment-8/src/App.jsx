import './App.css'
import LibraryManagement from './components/LibraryManagement'

const initialBooks = [
  { title: '1984', author: 'George Orwell' },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { title: 'To Kill a Mockingbird', author: 'Harper Lee' }
]

function App() {
  return (
    <LibraryManagement books={initialBooks} />
  )
}

export default App