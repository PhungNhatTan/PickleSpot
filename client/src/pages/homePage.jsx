import { useEffect, useState } from "react";
import { getFeaturedCourts } from "../api/court.js";
import CourtCard from "../components/courtCard.jsx";

export default function HomePage() {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const data = await getFeaturedCourts();
        setCourts(data || []);
      } catch (err) {
        console.error("Error loading courts:", err);
        setCourts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourts();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 py-14 text-center text-white">
        <h1 className="text-4xl font-bold mb-2">Danh sách sân Pickleball</h1>
        <p className="text-lg opacity-90">Chọn sân phù hợp và đặt ngay</p>
      </div>

      {/* Search + Tabs */}
      <div className="flex flex-col items-center mt-8 px-6 w-full">
        {/* Search Bar */}
        <div className="flex w-full max-w-3xl shadow-sm">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="border border-gray-300 rounded-l-lg p-3 flex-1 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
          <button
            type="button"
            className="border border-gray-300 bg-green-600 text-white px-5 rounded-r-lg hover:bg-green-700 transition"
          >
            🔍
          </button>
        </div>

        {/* Tabs */}
        <div className="flex mt-6 w-full max-w-3xl">
          <button className="flex-1 py-2 border border-gray-300 rounded-l-full bg-white hover:bg-gray-50 transition">
            Bản đồ
          </button>
          <button className="flex-1 py-2 border border-gray-300 rounded-r-full bg-white hover:bg-gray-50 transition">
            Sân đã đặt
          </button>
        </div>
      </div>

      {/* Courts List */}
      <section className="flex justify-center mt-10 flex-wrap gap-6 px-6">
        {loading ? (
          <p className="text-gray-500">Đang tải...</p>
        ) : courts.length ? (
          courts.map((courtGroup) => (
            <CourtCard key={courtGroup?.Id} courtGroup={courtGroup} />
          ))
        ) : (
          <p className="text-gray-500">Không tìm thấy sân nào</p>
        )}
      </section>
    </>
  );
}
