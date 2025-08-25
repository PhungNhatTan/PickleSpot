import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/mainLayout.jsx";
import AuthLayout from "./layouts/authLayout.jsx";

import HomePage from "./pages/homePage.jsx";
import SearchPage from "./pages/searchPage.jsx";
import CourtDetail from "./pages/courtDetail.jsx";
// import LoginPage from "./pages/LoginPage.jsx";
// import RegisterPage from "./pages/RegisterPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes with Navbar + Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/courts/:id" element={<CourtDetail />} />
        </Route>

        {/* Routes WITHOUT Navbar + Footer */}
        <Route element={<AuthLayout />}>
          {/* <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} /> */}
        </Route>

        {/* Redirect unknown url */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
