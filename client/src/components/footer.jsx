import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-auto py-6 border-t bg-white text-center text-sm text-gray-600">
      <p>
        Liên hệ:{" "}
        <a
          href="mailto:picklespot@gmail.com"
          className="text-green-600 hover:underline"
        >
          picklespot@gmail.com
        </a>{" "}
        | 0123 456 789
      </p>
      <div className="flex justify-center gap-6 mt-2">
        <Link to="/" className="hover:text-green-600">
          Trang chủ
        </Link>
        <Link to="/guide" className="hover:text-green-600">
          Hướng dẫn
        </Link>
        <Link to="/terms" className="hover:text-green-600">
          Điều khoản
        </Link>
      </div>
    </footer>
  );
}
