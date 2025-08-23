import { useEffect, useState } from 'react';
import { getFeaturedCourts } from '../api/court.js';
import CourtCard from '../components/courtCard.jsx';

export default function HomePage() {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const data = await getFeaturedCourts();
        setCourts(data || []);
      } catch (err) {
        console.error('Error loading courts:', err);
        setCourts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 py-10 text-center text-white">
        <h1 className="text-3xl font-bold">Danh sách sân Pickleball</h1>
        <p className="text-lg">Chọn sân phù hợp và đặt ngay</p>
      </div>

      {/* Search + Filters */}
      <div className="flex justify-center mt-6 px-4">
        <input
          type="text"
          placeholder="Tìm kiếm"
          className="border rounded-l-lg p-2 w-full max-w-md"
        />
        <button
          type="button"
          className="border bg-gray-200 px-4 rounded-r-lg hover:bg-gray-300"
        >
          🔍
        </button>
      </div>

      {/* Courts List */}
      <div className="flex justify-center mt-8 flex-wrap gap-6 px-6">
        {loading ? (
          <p>Đang tải...</p>
        ) : courts.length ? (
          courts.map((courtGroup) => (
            <CourtCard key={courtGroup?.Id} courtGroup={courtGroup} />
          ))
        ) : (
          <p>Không tìm thấy sân nào</p>
        )}
      </div>
    </div>
  );
}
