import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage.jsx';
import SearchPage from './pages/searchPage.jsx';
import CourtDetailPage from './pages/CourtDetailPage.jsx';
import './App.css';
import TestAuth from './TestAuth';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Landing page */}
          <Route path="/" element={<HomePage />} />

          {/* Search results page */}
          <Route path="/search" element={<SearchPage />} />

          {/* Court detail page */}
          <Route path="/courts/:id" element={<CourtDetailPage />} />
        </Routes>
      </BrowserRouter>

      {/* Debug/Auth check */}
      <TestAuth />
    </>
  );
}

export default App;
