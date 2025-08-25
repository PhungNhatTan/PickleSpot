import { Link } from "react-router-dom";

export default function Navbar() {
  const today = new Date().toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <header className="flex justify-between items-center px-8 py-4 border-b bg-white shadow-sm">
      {/* Logo */}
      <div className="text-2xl font-extrabold text-green-600 tracking-tight">
        PickleSpot
      </div>

      {/* Nav Links */}
      <nav className="md:flex gap-8 font-medium text-gray-700">
        <Link to="/" className="hover:text-green-600 transition">
          Trang chủ
        </Link>
        <Link to="/booking" className="hover:text-green-600 transition">
          Đặt sân
        </Link>
        <Link to="/guide" className="hover:text-green-600 transition">
          Hướng dẫn
        </Link>
        <Link to="/contact" className="hover:text-green-600 transition">
          Liên hệ
        </Link>
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <span className="hidden sm:block text-sm text-gray-500">{today}</span>
        <button className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition">
          Đăng nhập
        </button>
        <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition">
          Đăng ký
        </button>
      </div>
    </header>
  );
}
