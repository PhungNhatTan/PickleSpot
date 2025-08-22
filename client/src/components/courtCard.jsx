/* eslint-disable react/prop-types */
export default function CourtCard({ courtGroup }) {
  const court = courtGroup.courts[0]; // Show first court preview

  return (
    <div className="rounded-2xl shadow-md bg-white p-4 flex flex-col items-start w-72">
      <div className="w-full h-36 bg-gray-200 rounded-lg mb-3"></div>

      <h3 className="font-semibold text-lg">{courtGroup.Name}</h3>
      <p className="text-sm text-gray-600">{courtGroup.Location}</p>
      <p className="text-sm">
        {court?.OpenTime} - {court?.CloseTime}
      </p>
      <p className="text-green-600 font-bold mt-1">
        {court?.Price ? `${court.Price} VND` : 'N/A'}
      </p>

      <button
        type="button"
        className="bg-green-600 text-white px-4 py-2 rounded-lg mt-3 w-full hover:bg-green-700"
      >
        Xem chi tiết
      </button>
    </div>
  );
}
