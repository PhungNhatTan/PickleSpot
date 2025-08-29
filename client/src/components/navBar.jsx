import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const today = new Date().toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/notification/user/1", {
          credentials: "include", // if using cookies for auth
        });
        const data = await res.json();
        setNotifications(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <header className="flex justify-between items-center px-8 py-4 border-b bg-white shadow-sm relative">
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
        {/* Date */}
        <span className="hidden sm:block text-sm text-gray-500">{today}</span>

        {/* Notifications */}
        <div className="relative">
          <button
            className="relative px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
            onClick={() => setOpen(!open)}
          >
            🔔
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg border rounded-xl overflow-hidden z-50">
              {notifications.length === 0 ? (
                <div className="p-4 text-gray-500 text-sm">
                  Không có thông báo
                </div>
              ) : (
                <ul>
                  {notifications.map((n) => (
                    <li key={n.Id} className="border-b last:border-0">
                      <Link
                        to={`/booking/${n.CourtBooking.Id}`}
                        className="block p-3 hover:bg-gray-50"
                        onClick={() => setOpen(false)}
                      >
                        <p className="text-sm text-gray-800">{n.Message}</p>
                        <p className="text-xs text-gray-500">
                          {n.CourtBooking.Court.Name} –{" "}
                          {new Date(n.CourtBooking.BookStartTime).toLocaleString(
                            "vi-VN"
                          )}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Auth buttons */}
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
