import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Next } from './Next';

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/center">About</Link>
          </li>
        </ul>

        <Routes>
          <Route path="/" element={<Next />} />
          <Route path="/center" element={<h2>Home</h2>} />
        </Routes>
      </div>
    </Router>
  )
}
