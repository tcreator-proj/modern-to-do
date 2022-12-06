import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Next } from './Next';
import Header from './Header/Header';

export default function App() {
  return (
    <>
      <div>
        <Header />
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Next />} />
          <Route path="/center" element={<h2>Home</h2>} />
        </Routes>
    </Router>
    </>
  )
}
