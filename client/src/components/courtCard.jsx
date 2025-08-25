/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function CourtCard({ courtGroup }) {
  const court = courtGroup?.Court?.[0]; // Safe access

  return (
    <article className="rounded-2xl shadow-md bg-white p-4 flex flex-col w-72">
      {/* Image */}
      <div className="w-full h-40 bg-gray-200 rounded-lg mb-3 overflow-hidden flex items-center justify-center">
        {courtGroup?.ImageUrl ? (
          <img
            src={courtGroup.ImageUrl}
            alt={courtGroup?.Name || "Ảnh sân"}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-500 text-sm">Ảnh sân</span>
        )}
      </div>

      {/* Court name */}
      <h3 className="font-semibold text-lg mb-1">
        {courtGroup?.Name || "Tên sân chưa có"}
      </h3>

      {/* Address */}
      <p className="text-sm text-gray-600 line-clamp-2">
        {courtGroup?.Address || "Địa chỉ chưa cập nhật"}
      </p>

      {/* Price */}
      <p className="text-green-600 font-bold mt-2">
        {court?.Price !== null
          ? `${court.Price.toLocaleString()} VND`
          : "Giá: N/A"}
      </p>

      {/* Action button */}
      <Link
        to={`/courts/${courtGroup?.Id}`}
        className="bg-green-600 text-white px-4 py-2 rounded-lg mt-auto w-full hover:bg-green-700 transition-colors text-center"
      >
        Xem chi tiết
      </Link>
    </article>
  );
}
