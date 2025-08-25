import { Outlet } from "react-router-dom";
import Navbar from "../components/navBar.jsx";
import Footer from "../components/footer.jsx";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
